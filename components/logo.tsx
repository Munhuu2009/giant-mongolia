export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 text-lg font-black uppercase leading-none tracking-tight">
      <span className={inverted ? "text-white" : "text-neutral-900"}>Giant</span>
      <span aria-hidden="true" className="h-5 w-px bg-accent" />
      <span
        className={`text-xs font-semibold tracking-[0.3em] ${
          inverted ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        Mongolia
      </span>
    </span>
  );
}
