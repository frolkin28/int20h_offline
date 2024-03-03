import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Groups.module.css'
import { Group, Student, UserRole } from '../../types'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'
import { Button } from '../../components'

const sortAlphabetically = (students: Student[]) => {
  return students.sort((a, b) => {
    const lastNameA = a.last_name.toUpperCase()
    const lastNameB = b.last_name.toUpperCase()

    if (lastNameA < lastNameB) {
      return -1
    }
    if (lastNameA > lastNameB) {
      return 1
    }
    return 0
  })
}

export const GroupsPage = () => {
  const navigate = useNavigate()

  const { token, user } = useContext(AuthContext)

  const [groups, setGroups] = useState<Group[]>([])
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/groups`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setGroups(response.data.data)
    })()
  }, [])

  const handleGroupSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value.length) {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/students?group=${event.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setStudents(sortAlphabetically(response.data.data))
    }
  }

  const groupSelect = (
    <div className={styles.selectWrapper}>
      <select onChange={handleGroupSelect}>
        <option value="">Оберіть групу</option>
        {groups.map((group) => (
          <option value={group.id}>{group.name}</option>
        ))}
      </select>
    </div>
  )

  const table = (
    <table className={styles.studentsTable}>
      <tr>
        <th>Імʼя</th>
        <th>Прізвище</th>
        <th>Пошта</th>
      </tr>
      {students.map((student) => (
        <tr>
          <td>{student.first_name}</td>
          <td>{student.last_name}</td>
          <td>{student.email}</td>
        </tr>
      ))}
    </table>
  )

  return (
    <div className={styles.container}>
      {groupSelect}
      {user?.role === UserRole.Teacher ? (
        <Button
          text="Створити групу"
          secondary={true}
          onClick={() => navigate('/groups/create')}
        />
      ) : null}
      {students.length ? table : null}
    </div>
  )
}
