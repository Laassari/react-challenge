import { BuildingIcon, LayoutGrid, Locate } from 'lucide-react'
import classes from './JobCard.module.css'
import elipsify from '@/utils/elipsify'

export default function JobCard({
  name,
  company,
  summary,
  location,
  skills,
  category,
  isRemote,
}) {
  return (
    <div className={classes.container}>
      <p className={classes.title}>
        {name} {isRemote ? '(Remote)' : ''}
      </p>
      <div className={classes.meta}>
        {company && (
          <span className={classes.company}>
            <BuildingIcon size={18} />
            {company}
          </span>
        )}
        {location && (
          <span className={classes.location}>
            <Locate size={18} />
            {location}
          </span>
        )}
        {category && (
          <span className={classes.category}>
            <LayoutGrid size={18} />
            {category}
          </span>
        )}
      </div>

      <p className={classes.summary}>{elipsify(summary, 140)}</p>

      <div className={classes.tags}>
        {skills.map((skill) => (
          <span key={skill} className={classes.tag}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
