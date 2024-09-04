import {
  BuildingIcon,
  Calendar,
  ChevronRight,
  GripHorizontal,
  Languages,
  LayoutGrid,
  Locate,
} from 'lucide-react'
import classes from './JobCard.module.css'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { useDrag, useDrop } from 'react-dnd'

const ItemTypes = {
  CARD: 'card',
}

export default function JobCard({
  id,
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
  onJobsReorder,
  index,
}) {
  const [collapsed, setCollapsed] = useState(true)
  const dragRef = useRef(null)
  const previewRef = useRef(null)

  const formattedCreationDate = new Date(created_at).toLocaleDateString()
  const langs = languages?.map((l) => l.name).join(', ')

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!previewRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = previewRef.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onJobsReorder(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(dragRef)
  drop(preview(previewRef))

  return (
    <div
      className={classes.container}
      data-handler-id={handlerId}
      style={isDragging ? { opacity: 0, cursor: 'pointer' } : {}}
      ref={previewRef}
    >
      <button className={classes.dndIcon} ref={dragRef}>
        <GripHorizontal size={18} />
      </button>
      <button
        className={classes.title}
        onClick={() => setCollapsed(!collapsed)}
      >
        <h1>
          {name} {isRemote ? '(Remote)' : ''}
          <span
            className={clsx(classes.arrow, { [classes.expanded]: !collapsed })}
          >
            <ChevronRight />
          </span>
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
