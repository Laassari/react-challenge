import { useEffect, useRef } from 'react'
import classes from './JobFilters.module.css'
import sortCollection from '@/utils/sortCollection'

const jobCategories = [
  'AI / Research & Development',
  'Artificial Intelligence',
  'Financial Services',
  'Human Resources',
  'Software Engineering',
]

const sortEntities = {
  asc: '&#8593;',
  desc: '&#8595;',
}

const sortOptions = [
  { name: 'Name ', value: 'name', order: 'asc' },
  { name: 'Name', value: 'name', order: 'desc' },
  { name: 'Category', value: 'category', order: 'asc' },
  { name: 'Category', value: 'category', order: 'desc' },
  { name: 'Creation Date', value: 'created_at', order: 'asc' },
  { name: 'Creation Date', value: 'created_at', order: 'desc' },
]

export default function JobFilters({ jobs, onJobsProcessed }) {
  const formRef = useRef()

  useEffect(() => {
    if (!formRef.current) return

    const filters = getFilters()
    const form = formRef.current

    if (!filters) return

    form.term.value = filters.term
    form.jobCategory.value = filters.jobCategory
    form.sort.value = filters.sort
  }, [formRef])

  function getCategory(job) {
    const category = job.tags.find((t) => t.name.match(/category/i))

    return category?.value
  }

  const handleFilters = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const filters = Object.fromEntries(data.entries())
    saveFilters(filters)

    let newlist = jobs

    if (filters.jobCategory) {
      newlist = newlist.filter(
        (job) =>
          getCategory(job)?.toLowerCase() ===
          filters.jobCategory.toLocaleLowerCase()
      )
    }

    if (filters.term) {
      newlist = newlist.filter((job) =>
        job.name.toLowerCase().includes(filters.term)
      )
    }

    if (filters.sort) {
      const [key, order] = filters.sort.split(':')
      newlist = sortCollection(
        newlist,
        key === 'category' ? getCategory : order,
        {
          order,
          isDate: key === 'created_at',
        }
      )
    }

    onJobsProcessed(newlist)
  }

  const handleFiltersReset = () => {
    onJobsProcessed(jobs)
  }

  const saveFilters = (filters) => {
    localStorage.setItem('jobFilters', JSON.stringify(filters))
  }

  const getFilters = () => {
    const filters = localStorage.getItem('jobFilters')

    return JSON.parse(filters)
  }

  return (
    <form
      onSubmit={handleFilters}
      onReset={handleFiltersReset}
      className={classes.filtersForm}
      ref={formRef}
    >
      <input
        type="text"
        name="term"
        placeholder="Search term"
        className={classes.nameSearch}
      />

      <select name="jobCategory" className={classes.categorySelect}>
        <option value="">Select a category</option>
        {jobCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select name="sort" className={classes.sortSelect}>
        <option value="">Sort By</option>
        {sortOptions.map((option) => (
          <option
            key={`${option.name}_${option.order}`}
            value={`${option.value}:${option.order}`}
            dangerouslySetInnerHTML={{
              __html: `${option.name} ${sortEntities[option.order]}`,
            }}
          />
        ))}
      </select>

      <input type="submit" value="Search" />
      <input type="reset" value="Clear" className={classes.resetBtn} />
    </form>
  )
}
