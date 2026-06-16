interface FClubCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  children: string;
}

export function FClubCard({ imageSrc, imageAlt, title, children }: FClubCardProps) {
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
