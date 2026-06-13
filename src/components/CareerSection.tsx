import {
  jobs,
  jobKategorieInfos,
  type JobKategorie
} from "../../assets/ts/jobs";
import { JobCard } from "./JobCard";

export function CareerSection({ kategorie }: { kategorie: JobKategorie }) {
  const info = jobKategorieInfos[kategorie];
  const sectionJobs = jobs.filter((job) => job.kategorie === kategorie);

  return (
    <section className="career-section" id={info.id} aria-labelledby={`${info.id}-title`}>
      <div className="career-section__intro">
        <p className="career-eyebrow">{info.navigationLabel}</p>
        <h2 id={`${info.id}-title`}>{info.headline}</h2>
        <p>{info.intro}</p>
      </div>

      <div className="career-benefits" aria-label={`Vorteile ${info.navigationLabel}`}>
        {info.vorteile.map((vorteil) => (
          <div className="career-benefit" key={vorteil}>
            <span aria-hidden="true">✓</span>
            <p>{vorteil}</p>
          </div>
        ))}
      </div>

      <div className="career-job-grid">
        {sectionJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </section>
  );
}
