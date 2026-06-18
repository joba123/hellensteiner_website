import { jobDetailUrl, type Job } from "../../assets/ts/jobs";
import { Button } from "./Button";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="career-job-card">
      <div>
        <p className="career-job-card__meta">{job.arbeitsmodell}</p>
        <h3>{job.titel}</h3>
        <p className="career-job-card__location">
          {job.standort} · {job.start}
        </p>
        <p>{job.kurzbeschreibung}</p>
      </div>
      <Button as="a" href={jobDetailUrl(job.id)} className="career-job-card__button">
        Ausschreibung ansehen
      </Button>
    </article>
  );
}
