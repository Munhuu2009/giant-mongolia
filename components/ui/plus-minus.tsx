import { cn } from "@/lib/cn";

export function PlusMinus({ open, className }: { open: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative inline-flex size-3 shrink-0", className)}>
      <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
      <span
        className={cn(
          "absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300 ease-snappy",
          open && "rotate-90 scale-y-0",
        )}
      />
    </span>
  );
}
