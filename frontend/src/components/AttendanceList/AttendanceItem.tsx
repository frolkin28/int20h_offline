import axios from 'axios'
import { ChangeEvent, useContext, useState } from 'react'

import { Attendance } from '../../types'
import styles from './AttendanceItem.module.css'
import { AuthContext } from '../../AuthContext'

interface AttendanceItemProps {
  activityId: number
  attendance: Attendance
  canEdit: boolean
}

export const AttendanceItem = ({
  activityId,
  attendance,
  canEdit,
}: AttendanceItemProps) => {
  const [attendanceMark, setAttendanceMark] = useState<string>(
    attendance.attendance?.mark || ''
  )
  const { token } = useContext(AuthContext)

  const handleMarkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAttendanceMark(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      if (!attendanceMark) {
        alert('Введіть оцінку або не відвідування')
        return
      }

      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/attendance`,
        {
          activity_id: activityId,
          student_id: attendance.student.id,
          mark: attendanceMark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Зміни успішно збережені')
    } catch (error: any) {
      alert('Сталась помилка')
    }
  }

  return (
    <li key={attendance.student.id} className={styles.attendanceItem}>
      <p>
        {attendance.student.first_name} {attendance.student.last_name}
      </p>
      {canEdit ? (
        <div>
          <label>
            Оцінка:
            <input
              type="text"
              value={attendanceMark}
              onChange={handleMarkChange}
            />
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <p>Оцінка: {attendanceMark}</p>
      )}
    </li>
  )
}
