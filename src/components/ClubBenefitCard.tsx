interface ClubBenefitCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  children: string;
}

export function ClubBenefitCard({ imageSrc, imageAlt, title, children }: ClubBenefitCardProps) {
  return (
    <article className="club-card">
      <img src={imageSrc} alt={imageAlt} />
      <div className="club-card-content">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}
