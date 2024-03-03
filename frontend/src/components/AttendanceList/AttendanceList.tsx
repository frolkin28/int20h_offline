import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

import { Activity } from '../../types'
import styles from './AttendanceList.module.css'
import { AttendanceItem } from './AttendanceItem'
import { AuthContext } from '../../AuthContext'
import { UserRole } from '../../types'

interface AttendanceListProps {
  activityId: number
}

export const AttendanceList = ({ activityId }: AttendanceListProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [activity, setActivity] = useState<Activity | null>(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/activity/${activityId}`
        )
        setActivity(response.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return <div className={styles.activityTitle}>Завантаження...</div>
  }

  if (!activity) {
    return <div className={styles.activityTitle}>Сталась помилка</div>
  }

  return (
    <div>
      <h1 className={styles.activityTitle}>{activity.subject.name}</h1>
      <h3 className={styles.activityTitle}>
        {activity.type} {activity.date}
      </h3>
      <section className={styles.sectionContainer}>
        <ul className={styles.attendanceList}>
          {activity.attendance.map((attend) => {
            return (
              <AttendanceItem
                activityId={activity.id}
                attendance={attend}
                canEdit={user?.role == UserRole.Teacher}
              />
            )
          })}
        </ul>
      </section>
    </div>
  )
}
