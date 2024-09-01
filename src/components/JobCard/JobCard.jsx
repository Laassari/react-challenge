import {
  BuildingIcon,
  Calendar,
  Languages,
  LayoutGrid,
  Locate,
} from 'lucide-react'
import classes from './JobCard.module.css'
import { useState } from 'react'
import clsx from 'clsx'

export default function JobCard({
  name,
  company,
  summary,
  location,
  skills,
  category,
  isRemote,
  sections,
  created_at,
  languages,
}) {
  const [collapsed, setCollapsed] = useState(true)
  const formattedCreationDate = new Date(created_at).toLocaleDateString()
  const langs = languages?.map((l) => l.name).join(', ')

  return (
    <div className={classes.container}>
      <button
        className={classes.title}
        onClick={() => setCollapsed(!collapsed)}
      >
        <h1>
          {name} {isRemote ? '(Remote)' : ''}
        </h1>
      </button>

      {company && collapsed && (
        <div className={classes.location}>
          <BuildingIcon size={18} />
          {company}
        </div>
      )}

      <p className={clsx(classes.summary, { [classes.collapsed]: collapsed })}>
        {summary}
      </p>

      {sections.length > 0 && (
        <div
          className={clsx(classes.sections, { [classes.collapsed]: collapsed })}
        >
          {sections.map((section) => (
            <div key={section.description}>
              {section.title && <h2>{section.title}</h2>}
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className={clsx(classes.info, { [classes.collapsed]: collapsed })}>
        <div className={classes.infoItem}>
          <BuildingIcon size={18} /> Company: <b>{company}</b>
        </div>
        <div className={classes.infoItem}>
          <Calendar size={18} /> Start Date: <b>{formattedCreationDate}</b>
        </div>
        {location && (
          <div className={classes.infoItem}>
            <Locate size={18} /> Location: <b>{location}</b>
          </div>
        )}
        {category && (
          <div className={classes.infoItem}>
            <LayoutGrid size={18} /> Category: <b>{category}</b>
          </div>
        )}
        {langs && (
          <div className={classes.infoItem}>
            <Languages size={18} /> Languages: <b>{langs}</b>
          </div>
        )}
      </div>

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
