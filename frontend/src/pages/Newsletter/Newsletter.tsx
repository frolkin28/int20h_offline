import axios from 'axios'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import { UserRole } from '../../types'

export const Newsletter = () => {
  const navigate = useNavigate()

  const { isSignedIn, user, token } = useContext(AuthContext)
  const [target, setTarget] = useState<string>('')
  const [text, setText] = useState<string>('')

  const handleTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(event.target.value)
  }

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!(target && text)) {
      alert('Невалідні дані')
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/newsletter`,
        {
          target,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Успіх')
    } catch (error) {
      alert('Сталася помилка')
    }
  }

  useEffect(() => {
    if (!isSignedIn || user?.role !== UserRole.Teacher) {
      navigate('/')
    }
  }, [isSignedIn, user])

  return (
    <div>
      <h1>Створити розсилку (сповіщення)</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="target">Target:</label>
            <input
              type="text"
              id="target"
              value={target}
              onChange={handleTargetChange}
              placeholder="Enter target"
            />
          </div>
          <div>
            <label htmlFor="text">Text:</label>
            <textarea
              id="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
