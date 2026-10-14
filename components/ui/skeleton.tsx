import { cn } from "@/lib/cn";

export function Skeleton({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden after:absolute after:inset-0 after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:to-transparent",
        tone === "light" ? "bg-neutral-200/70 after:via-white/60" : "bg-white/[0.06] after:via-white/[0.07]",
        className,
      )}
    />
  );
}
