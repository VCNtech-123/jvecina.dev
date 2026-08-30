import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGithubReadme } from "../../hooks/useGithubReadme";

const resolveUrl = (url: string, baseUrl: string | null) => {
  if (!baseUrl) return url;
  if (/^(https?:)?\/\//.test(url) || url.startsWith("#") || url.startsWith("mailto:")) return url;
  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return url;
  }
};

interface GithubReadmeProps {
  githubUrl?: string | null;
  fallback?: string | null;
}

const GithubReadme = ({ githubUrl, fallback }: GithubReadmeProps) => {
  const { markdown, baseUrl, loading, error } = useGithubReadme(githubUrl);

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-2/3 rounded bg-white/5" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
        <div className="h-4 w-3/4 rounded bg-white/5" />
      </div>
    );
  }

  if (markdown) {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(url) => resolveUrl(url, baseUrl)}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-8 text-xl font-semibold tracking-tight first:mt-0">{children}</h2>
          ),
          h2: ({ children }) => <h3 className="mt-6 text-lg font-semibold tracking-tight">{children}</h3>,
          h3: ({ children }) => <h4 className="mt-5 text-base font-semibold">{children}</h4>,
          p: ({ children }) => <p className="mt-3 text-sm leading-relaxed text-muted">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-border underline-offset-4 hover:decoration-current"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mt-3 border-l-2 border-border pl-4 text-sm italic text-muted">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-border" />,
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="my-4 w-full rounded-xl border border-border object-cover" />
          ),
          table: ({ children }) => (
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-xs">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
          th: ({ children }) => <th className="border-b border-border px-3 py-2 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border-b border-border px-3 py-2 text-muted">{children}</td>,
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-xl border border-border bg-black/30 p-4">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const text = String(children);
            if (text.includes("\n")) {
              return (
                <code className={`block font-mono text-xs text-muted ${className ?? ""}`}>{children}</code>
              );
            }
            return (
              <code className="rounded border border-border bg-black/30 px-1.5 py-0.5 font-mono text-[0.8em]">
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    );
  }

  return (
    <p className="whitespace-pre-line text-sm text-muted">
      {fallback || (error ? `Couldn't load README from GitHub — ${error}` : "No description yet.")}
    </p>
  );
};

export default GithubReadme;