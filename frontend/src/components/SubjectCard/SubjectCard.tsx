import { Link, useNavigate } from 'react-router-dom'
import styles from './SubjectCard.module.css'

export interface SubjectCardProps {
  name: string
  link: string
  group?: string
}

export const SubjectCard = (props: SubjectCardProps) => {
  const { name, link, group } = props
  return (
    <Link to={link}>
      <div className={styles.container}>
        <span className={styles.subjectName}>{name}</span>
        {group ? <span>{group}</span> : null}
      </div>
    </Link>
  )
}
