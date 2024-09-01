import { Loader as LoaderIcon } from 'lucide-react'
import classes from './Loader.module.css'

export default function Loader({ size = 24 }) {
  return <div className={classes.container}>
    <LoaderIcon className={classes.icon} size={size} />
  </div>
}
