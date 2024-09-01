import { useEffect, useState } from 'react'

export default function useJobs(page = 1) {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState(null)
  const [error, setError] = useState(null)
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    setLoading(true)

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': import.meta.env.VITE_API_KEY,
      },
    }

    const url = new URL('https://api.hrflow.ai/v1/jobs/searching')

    url.searchParams.set('board_keys', import.meta.env.VITE_BOARD_KEYS)
    url.searchParams.set('page', page)
    url.searchParams.set('limit', 10)
    url.searchParams.set('order_by', 'desc')

    fetch(url.toString(), options)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setJobs(res.data.jobs)
          setMeta(res.meta)
        } else {
          setError(res.message)
        }
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [page])

  return { loading, jobs, meta, error }
}
