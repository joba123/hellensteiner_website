import { jobDetailUrl, type Job } from "../../assets/ts/jobs";
import { Button } from "./Button";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="karriere-stellenkarte">
      <div>
        <p className="karriere-stellenkarte__metadaten">{job.arbeitsmodell}</p>
        <h3>{job.titel}</h3>
        <p className="karriere-stellenkarte__standort">
          {job.standort} · {job.start}
        </p>
        <p>{job.kurzbeschreibung}</p>
      </div>
      <Button as="a" href={jobDetailUrl(job.id)} className="karriere-stellenkarte__button">
        Ausschreibung ansehen
      </Button>
    </article>
  );
}
