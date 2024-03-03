import { useContext, useState } from 'react'
import { AuthContext } from '../../AuthContext'

export const Account = () => {
  const { isSignedIn, user } = useContext(AuthContext)
  const [firstName, setFirstName] = useState(user?.first_name || '')
  const [lastName, setLastName] = useState(user?.last_name || '')

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const saveAccountInfo = () => {
    if (!(firstName && lastName)) {
      alert('Заповніть всі поля')
    } else {
      alert('Збережено')
    }
  }

  if (!isSignedIn) {
    return <div>Дані завантажуються...</div>
  }

  return (
    <div>
      <h1>Кабінет користувача</h1>
      <div>
        <p>
          <strong>Ім'я:</strong> {firstName}
        </p>
        <p>
          <strong>Прізвище:</strong> {lastName}
        </p>
      </div>
      <div>
        <label htmlFor="firstName">Ім'я:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Прізвище:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div>
        <button onClick={saveAccountInfo}>Зберегти</button>
      </div>
    </div>
  )
}
