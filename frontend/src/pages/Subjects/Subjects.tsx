import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import { SubjectsList } from '../../components'

export const SubjectsPage = () => {
  const navigate = useNavigate()
  const { isSignedIn, isStorageChecked, user } = useContext(AuthContext)

  useEffect(() => {
    if (isStorageChecked && !isSignedIn) {
      console.log('not signed in')
      navigate('/')
    }
  }, [isSignedIn, isStorageChecked])

  return <SubjectsList />
}
