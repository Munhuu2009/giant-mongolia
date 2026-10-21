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
    <div className="section-heading">
      <div>
        <p className="chip chip-accent mb-4">{eyebrow}</p>
        <h2 id={id} className={inverted ? "type-headline is-inverted" : "type-headline"}>
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
