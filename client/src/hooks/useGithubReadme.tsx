import { useEffect, useState } from "react";

interface ReadmeState {
  markdown: string | null;
  baseUrl: string | null;
  loading: boolean;
  error: string | null;
}

function parseGithubRepo(url: string) {
  try {
    const u = new URL(url);
    if (!/(^|\.)github\.com$/.test(u.hostname)) return null;
    const [owner, repoRaw] = u.pathname.split("/").filter(Boolean);
    if (!owner || !repoRaw) return null;
    return { owner, repo: repoRaw.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

function decodeBase64Utf8(base64: string) {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export function useGithubReadme(githubUrl?: string | null): ReadmeState {
  const [state, setState] = useState<ReadmeState>({
    markdown: null,
    baseUrl: null,
    loading: Boolean(githubUrl),
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    if (!githubUrl) {
      setState({ markdown: null, baseUrl: null, loading: false, error: null });
      return;
    }

    const parsed = parseGithubRepo(githubUrl);
    if (!parsed) {
      setState({ markdown: null, baseUrl: null, loading: false, error: "Not a GitHub repo URL." });
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/readme`,
          { headers: { Accept: "application/vnd.github+json" } }
        );

        if (res.status === 404) throw new Error("This repository has no README.");
        if (res.status === 403) throw new Error("GitHub rate limit hit, try again shortly.");
        if (!res.ok) throw new Error(`GitHub API error (${res.status}).`);

        const data = await res.json();
        const markdown = decodeBase64Utf8(data.content as string);
        const baseUrl = (data.download_url as string).replace(/\/[^/]+$/, "/");

        if (!ignore) setState({ markdown, baseUrl, loading: false, error: null });
      } catch (e) {
        if (!ignore) {
          setState({
            markdown: null,
            baseUrl: null,
            loading: false,
            error: e instanceof Error ? e.message : "Failed to load README.",
          });
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [githubUrl]);

  return state;
}