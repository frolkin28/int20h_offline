import { useContext } from 'react'
import { UserRole } from '../../types'
import { AuthContext } from '../../AuthContext'
import { CreateSubjectForm } from '../../components'
import { useNavigate } from 'react-router-dom'
import styles from './Subject.module.css'

export const CreateSubjectPage = () => {
  const navigate = useNavigate()
  const { isSignedIn, user } = useContext(AuthContext)

  if (!isSignedIn || user?.role !== UserRole.Teacher) {
    navigate('')
  }

  return (
    <div className={styles.container}>
      <CreateSubjectForm />
    </div>
  )
}
