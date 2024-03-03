import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import { Subject } from '../../types'
import { SubjectCard } from '../SubjectCard/SubjectCard'
import styles from './Subjects.module.css'
import { Link } from 'react-router-dom'
import { Button } from '../'

export const SubjectsTeacher = () => {
  const navigate = useNavigate()

  const { token } = useContext(AuthContext)

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
        const mockSubjects = [
          {
            subject_id: 1,
            subject_name: 'Matan',
            group_name: 'KN-52',
          },
          {
            subject_id: 2,
            subject_name: 'Matan',
            group_name: 'KN-52',
          },
          {
            subject_id: 3,
            subject_name: 'Matan',
            group_name: 'KN-52',
          },
          {
            subject_id: 4,
            subject_name: 'Matan',
            group_name: 'KN-52',
          },
          {
            subject_id: 5,
            subject_name: 'Matan',
            group_name: 'KN-52',
          },
        ]
        setSubjects(mockSubjects)
        // setSubjects(response.data.data.subject_list)
      } catch (error) {
        alert('Сталася помилка')
      }
    })()
  }, [])

  const renderedSubjects = subjects?.map((subject) => (
    <SubjectCard
      name={subject.subject_name}
      group={subject.group_name}
      link={'/'}
    />
  ))

  return (
    <div>
      <Button
        text="Створити предмет"
        secondary={true}
        onClick={() => navigate('/subjects/create')}
      />
      <div className={styles.subjectsWrapper}>{renderedSubjects}</div>
    </div>
  )
}
