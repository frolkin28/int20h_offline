import { useContext, useState, ChangeEvent } from 'react'
import axios from 'axios'
import styles from './SignInUpForm.module.css'
import formStyles from '../Forms.module.css'
import { Button, TextInput } from '../..'
import { AuthContext } from '../../../AuthContext'
import { UserRole } from '../../../types'

export const SignUpForm = () => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastname] = useState('')
  const [group, setGroup] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [role, setRole] = useState(UserRole.Student)
  const [isSubmitting, setSubmitting] = useState(false)

  const handleEmailChange = (value: string) => setEmail(value)
  const handleFirstNameChange = (value: string) => setFirstName(value)
  const handleLastNameChange = (value: string) => setLastname(value)
  const handleGroupChange = (value: string) => setGroup(value)
  const handlePasswordChange = (value: string) => setPassword(value)
  const handlePasswordRepeatChange = (value: string) => setPasswordRepeat(value)
  const handleRoleOptionChange = (event: ChangeEvent<HTMLInputElement>) =>
    setRole(Number(event.target.value))

  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      if (!email.length) {
        return alert('Введіть email')
      }
      if (!firstName.length) {
        return alert('Введіть імʼя')
      }
      if (!lastName.length) {
        return alert('Введіть прізвище')
      }
      if (role === UserRole.Student && !group.length) {
        return alert('Введіть групу')
      }
      if (!password.length) {
        return alert('Введіть пароль')
      }
      if (password !== passwordRepeat) {
        return alert('Паролі не співпадають')
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/sign_up`,
        {
          first_name: firstName,
          last_name: lastName,
          group,
          email,
          password,
          role,
        }
      )
      login(res.data.data.access_token)
    } catch (error) {
      alert('Сталася помилка')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        <div className={formStyles.inputContainer}>
          <label htmlFor="email">Email</label>
          <TextInput id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className={formStyles.inputContainer}>
          <label htmlFor="first-name">Імʼя</label>
          <TextInput
            id="first-name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className={formStyles.inputContainer}>
          <label htmlFor="last-name">Прізвище</label>
          <TextInput
            id="last-name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className={styles.radioButtonContainer}>
          <label>
            <input
              type="radio"
              value={UserRole.Student}
              checked={role === UserRole.Student}
              onChange={handleRoleOptionChange}
            />
            Я студент
          </label>
          <label>
            <input
              type="radio"
              value={UserRole.Teacher}
              checked={role === UserRole.Teacher}
              onChange={handleRoleOptionChange}
            />
            Я викладач
          </label>
        </div>
        {role === UserRole.Student ? (
          <div className={formStyles.inputContainer}>
            <label htmlFor="group">Група</label>
            <TextInput id="group" value={group} onChange={handleGroupChange} />
          </div>
        ) : null}
        <div className={formStyles.inputContainer}>
          <label htmlFor="password">Пароль</label>
          <TextInput
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className={formStyles.inputContainer}>
          <label htmlFor="password-repeat">Повторіть пароль</label>
          <TextInput
            id="password-repeat"
            type="password"
            value={passwordRepeat}
            onChange={handlePasswordRepeatChange}
          />
        </div>
      </div>
      <Button
        text="Зареєструватись"
        onClick={handleSubmit}
        disabled={isSubmitting}
      />
    </form>
  )
}
