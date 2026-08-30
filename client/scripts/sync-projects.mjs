import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// client root = /client
const clientRoot = path.resolve(__dirname, "..");
const outFile = path.join(clientRoot, "public", "projects.json");

const url = process.env.SYNC_PROJECTS_URL;
if (!url) {
  console.error("Missing SYNC_PROJECTS_URL");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchWithRetry = async (tries = 6) => {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      await sleep(700 * (i + 1)); // helps if Render is waking
    }
  }
  throw lastErr;
};

const json = await fetchWithRetry();
const projects = json?.data ?? json ?? [];

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify(projects, null, 2), "utf8");

console.log(`Synced ${projects.length} projects -> ${outFile}`);