import { useContext, useState } from 'react'
import formStyles from '../Forms.module.css'
import { TextInput } from '../../Inputs/TextInput'
import { Button } from '../../Buttons/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../AuthContext'

export const CreateGroupForm = () => {
  const navigate = useNavigate()

  const { token } = useContext(AuthContext)

  const [groupName, setGroupName] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const handleGroupNameChange = (value: string) => setGroupName(value)

  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      if (!groupName.length) {
        return alert('Введіть назву групи')
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/groups`,
        {
          name: groupName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      navigate('/groups')
    } catch (error) {
      alert('Сталася помилка')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form>
      <div className={formStyles.inputContainer}>
        <label htmlFor="group-name">Назва групи</label>
        <TextInput
          id="group-name"
          value={groupName}
          onChange={handleGroupNameChange}
        />
      </div>
      <Button text="Створити" onClick={handleSubmit} disabled={isSubmitting} />
    </form>
  )
}
