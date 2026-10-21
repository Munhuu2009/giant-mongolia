"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/language-provider";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
  inverted?: boolean;
};

export default function SectionHeading({ id, eyebrow, title, action, inverted = false }: SectionHeadingProps) {
  const { translate } = useLanguage();

  return (
    <div className="section-heading">
      <div>
        <p className="chip chip-accent mb-4">{translate(eyebrow)}</p>
        <h2 id={id} className={inverted ? "type-headline is-inverted" : "type-headline"}>
          {translate(title)}
        </h2>
      </div>
      {action}
    </div>
  );
}
