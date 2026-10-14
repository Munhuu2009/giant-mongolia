import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
  inverted?: boolean;
};

export default function SectionHeading({ id, eyebrow, title, action, inverted = false }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl ${
            inverted ? "text-white" : "text-neutral-900"
          }`}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
