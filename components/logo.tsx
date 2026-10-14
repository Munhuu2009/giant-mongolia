import { cn } from "@/lib/cn";

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-3 leading-none">
      <span
        className={cn(
          "text-[19px] font-black uppercase tracking-[-0.02em]",
          inverted ? "text-white" : "text-neutral-900",
        )}
      >
        Giant
      </span>
      <span aria-hidden="true" className="h-4 w-px translate-y-px bg-accent" />
      <span
        className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.34em]",
          inverted ? "text-white/55" : "text-neutral-600",
        )}
      >
        Mongolia
      </span>
    </span>
  );
}
