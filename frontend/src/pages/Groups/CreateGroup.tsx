import { useContext, useEffect } from 'react'
import { CreateGroupForm } from '../../components'
import { AuthContext } from '../../AuthContext'
import { UserRole } from '../../types'
import { useNavigate } from 'react-router-dom'

export const CreateGroupPage = () => {
  const navigate = useNavigate()

  const { isSignedIn, user } = useContext(AuthContext)

  useEffect(() => {
    if (!isSignedIn || user?.role !== UserRole.Teacher) {
      navigate('/')
    }
  })

  return <CreateGroupForm />
}
