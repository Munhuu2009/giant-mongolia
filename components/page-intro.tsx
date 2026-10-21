type PageIntroProps = {
  id?: string;
  eyebrow: string;
  title: string;
  lead: string;
};

export default function PageIntro({ id, eyebrow, title, lead }: PageIntroProps) {
  return (
    <header className="page-intro wrap">
      <p className="chip chip-accent">{eyebrow}</p>
      <h1 id={id} className="type-headline">
        {title}
      </h1>
      <p className="type-lead">{lead}</p>
    </header>
  );
}
