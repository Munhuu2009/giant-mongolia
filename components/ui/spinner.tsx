import { cn } from "@/lib/cn";

type SpinnerProps = {
  size?: number;
  className?: string;
  /** When provided the spinner is announced as a status; otherwise it is decorative. */
  label?: string;
};

export function Spinner({ size = 20, className, label }: SpinnerProps) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-full animate-wheel">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="var(--color-accent)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="13 47"
        />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

const SPOKES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return {
    x2: 24 + Math.cos(angle) * 19,
    y2: 24 + Math.sin(angle) * 19,
  };
});

export function WheelLoader({ size = 64, label = "Loading" }: { size?: number; label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-5">
      <span aria-hidden="true" className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 48 48" fill="none" className="absolute inset-0 animate-wheel-slow text-neutral-300">
          <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1" />
          {SPOKES.map((spoke, i) => (
            <line key={i} x1="24" y1="24" x2={spoke.x2} y2={spoke.y2} stroke="currentColor" strokeWidth="0.5" />
          ))}
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 48 48" fill="none" className="absolute inset-0 animate-wheel">
          <circle cx="24" cy="24" r="21" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="20 112" />
        </svg>
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-neutral-500">{label}</span>
    </div>
  );
}
