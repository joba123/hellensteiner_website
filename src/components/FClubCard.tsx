interface FClubCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  children: string;
}

export function FClubCard({ imageSrc, imageAlt, title, children }: FClubCardProps) {
  return (
    <article className="club-karte">
      <img src={imageSrc} alt={imageAlt} />
      <div className="club-karte-inhalt">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}
