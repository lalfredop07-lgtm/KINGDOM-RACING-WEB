export function Eyebrow({ children, index, className = "" }: { children: React.ReactNode; index?: string; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-red ${className}`}>
      {index ? <span className="tabular-nums">{index}</span> : null}
      <span className="h-px w-8 bg-red" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
