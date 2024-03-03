import axios from 'axios'
import { Link } from 'react-router-dom'
import { ActivityItem } from '../../types'
import { useEffect, useState } from 'react'
import styles from './ActivitiesList.module.css'

interface ActivitiesListProps {
  subjectId: number
}

export const ActivitiesList = ({ subjectId }: ActivitiesListProps) => {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/journal/${subjectId}`
      )
      setActivities(response.data.data.activites_list)
    })()
  }, [])

  return (
    <div>
      <h1 className={styles.subjectTitle}>Розклад занять</h1>
      <section className={styles.sectionContainer}>
        <ul className={styles.activitiesList}>
          {activities.map((activity) => {
            return (
              <li key={activity.active_id} className={styles.activityItem}>
                <Link
                  to={`/activity/${activity.active_id}`}
                  className={styles.activityLink}
                >
                  {activity.date} {activity.type}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
