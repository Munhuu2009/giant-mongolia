"use client";

import { useLanguage } from "@/components/language-provider";

type PageIntroProps = {
  id?: string;
  eyebrow: string;
  title: string;
  lead: string;
};

export default function PageIntro({ id, eyebrow, title, lead }: PageIntroProps) {
  const { translate } = useLanguage();

  return (
    <header className="page-intro wrap">
      <p className="chip chip-accent">{translate(eyebrow)}</p>
      <h1 id={id} className="type-headline">
        {translate(title)}
      </h1>
      <p className="type-lead">{translate(lead)}</p>
    </header>
  );
}
