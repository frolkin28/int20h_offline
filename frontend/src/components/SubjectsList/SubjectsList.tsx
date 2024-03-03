import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import { Subject, UserRole } from '../../types'
import { SubjectCard } from '../SubjectCard/SubjectCard'
import styles from './SubjectsList.module.css'
import { Button } from '..'

export const SubjectsList = () => {
  const navigate = useNavigate()

  const { token, user } = useContext(AuthContext)

  const [subjects, setSubjects] = useState<Subject[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/journal/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setSubjects(response.data.data.subject_list)
      } catch (error) {
        alert('Сталася помилка')
      }
    })()
  }, [])

  const renderedSubjects = subjects?.map((subject) => (
    <SubjectCard
      name={subject.subject_name}
      group={subject.group_name}
      link={`/subject/${subject.subject_id}`}
    />
  ))

  return (
    <div>
      {user?.role == UserRole.Teacher && (
        <Button
          text="Створити предмет"
          secondary={true}
          onClick={() => navigate('/subjects/create')}
        />
      )}

      <div className={styles.subjectsWrapper}>{renderedSubjects}</div>
    </div>
  )
}
