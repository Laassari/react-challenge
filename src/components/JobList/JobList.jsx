import JobCard from '@/components/JobCard/JobCard'
import classes from './JobList.module.css'
import { CircleSlash } from 'lucide-react'
import Pagination from '../Pagination/Pagination'
import Loader from '../Loader/Loader'
import { useEffect, useState } from 'react'
import reorder from '../../utils/reorder'

export default function JobList({ jobs, meta, loading, onPageChange }) {
  const [jobsList, setJobsList] = useState(jobs)

  useEffect(() => {
    setJobsList(jobs)
  }, [jobs])

  function isRemote(job) {
    const relocation = job.tags.find((t) => t.name === 'Relocation')

    return relocation?.value === 'remote'
  }

  function getCompanyName(job) {
    const company = job.tags.find((t) => t.name.match(/company/i))

    return company?.value
  }
  function getCategory(job) {
    const category = job.tags.find((t) => t.name.match(/category/i))

    return category?.value
  }

  if (!loading && !jobsList) return

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.jobsList}>
          {jobsList.length === 0 ? (
            <div className={classes.emptyList}>
              <CircleSlash size={24} />
              No jobs matched.
            </div>
          ) : (
            jobsList.map((job, idx) => (
              <JobCard
                key={job.id}
                id={job.id}
                name={job.name}
                company={getCompanyName(job)}
                summary={job.summary}
                location={job.location.text}
                skills={job.skills.map((s) => s.name)}
                isRemote={isRemote(job)}
                category={getCategory(job)}
                sections={job.sections}
                created_at={job.created_at}
                languages={job.languages}
                onJobsReorder={(startIndex, endIndex) =>
                  setJobsList(reorder(jobsList, startIndex, endIndex))
                }
                index={idx}
              ></JobCard>
            ))
          )}
        </div>
      )}

      {meta && (
        <Pagination
          maxPage={meta.maxPage}
          currentPage={meta.page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}
