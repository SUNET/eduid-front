interface SectionIntroProps {
  heading: React.ReactNode;
  description: React.ReactNode;
}

export function SectionIntro({ heading, description }: SectionIntroProps): JSX.Element {
  return (
    <section className="intro">
      <h1>{heading}</h1>
      <div className="lead">
        <p>{description}</p>
      </div>
    </section>
  );
}
