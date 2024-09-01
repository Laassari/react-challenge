import JobList from '@/components/JobList/JobList'
import useJobs from './hooks/useJobs'
import { useEffect, useState } from 'react'
import JobFilters from './components/JobFilters/JobFilters'

function App() {
  const [page, setPage] = useState(1)
  const { loading, error, jobs, meta } = useJobs(page)
  const [processedJobs, setProcessedJobs] = useState(jobs)

  useEffect(() => {
    setProcessedJobs(jobs)
  }, [jobs])

  if (error) return <p>{error}</p>

  return (
    <div style={{ marginTop: 20 }}>
      <JobFilters jobs={jobs} onJobsProcessed={setProcessedJobs} />

      <JobList
        jobs={processedJobs}
        meta={meta}
        onPageChange={setPage}
        loading={loading}
      />

      <div></div>
    </div>
  )
}

export default App
