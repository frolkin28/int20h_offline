import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import { UserRole, Subject } from '../../types'
import { SubjectsTeacher, SubjectsStudent } from '../../components'

export const SubjectsPage = () => {
  const navigate = useNavigate()
  const { isSignedIn, isStorageChecked, user } = useContext(AuthContext)

  useEffect(() => {
    if (isStorageChecked && !isSignedIn) {
      console.log('not signed in')
      navigate('/')
    }
  }, [isSignedIn, isStorageChecked])

  if (user?.role === UserRole.Teacher) {
    return <SubjectsTeacher />
  }
  if (user?.role === UserRole.Student) {
    return <SubjectsStudent />
  }

  return null
}
