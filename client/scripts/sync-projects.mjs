import fs from "node:fs/promises";

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
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      await sleep(700 * (i + 1));
    }
  }
  throw lastErr;
};

const data = await fetchWithRetry();

const projects = data?.data ?? [];

await fs.mkdir("./public", { recursive: true });
await fs.writeFile("./public/projects.json", JSON.stringify(projects, null, 2), "utf8");

console.log(`Synced ${projects.length} projects -> public/projects.json`);