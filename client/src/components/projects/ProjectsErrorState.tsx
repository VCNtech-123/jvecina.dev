import { AlertIcon } from "./icons";

const ProjectsErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center gap-3 rounded-card border border-border bg-surface px-6 py-20 text-center">
    <AlertIcon />
    <p className="text-[15px] text-text">Couldn't load projects</p>
    <p className="max-w-sm text-sm text-muted">{message}</p>
    <button type="button" onClick={onRetry} className="btn-secondary mt-1">
      Try again
    </button>
  </div>
);

export default ProjectsErrorState;