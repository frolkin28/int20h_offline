import { useState, ChangeEvent } from "react"
import styles from "./SignInUpForm.module.css"
import formStyles from "../Forms.module.css"
import { Button, TextInput } from "../.."

enum UserRoles {
  Student = 1,
  Teacher = 2
}

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [role, setRole] = useState(UserRoles.Student)
  const [isSubmitting, setSubmitting] = useState(false)

  const handleEmailChange = (value: string) => setEmail(value)
  const handleFirstNameChange = (value: string) => setFirstName(value)
  const handleLastNameChange = (value: string) => setLastname(value)
  const handlePasswordChange = (value: string) => setPassword(value)
  const handlePasswordRepeatChange = (value: string) => setPasswordRepeat(value)
  const handleRoleOptionChange = (event: ChangeEvent<HTMLInputElement>) => setRole(Number(event.target.value))

  const handleSubmit = () => {

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
          <TextInput id="first-name" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className={formStyles.inputContainer}>
          <label htmlFor="last-name">Прізвище</label>
          <TextInput id="last-name" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className={formStyles.inputContainer}>
          <label  htmlFor="password">Пароль</label>
          <TextInput id="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className={formStyles.inputContainer}>
          <label  htmlFor="password-repeat">Повторіть пароль</label>
          <TextInput id="password-repeat" type="password" value={passwordRepeat} onChange={handlePasswordRepeatChange} />
        </div>
        <div className={styles.radioButtonContainer}>
          <label>
            <input
              type="radio"
              value={UserRoles.Student}
              checked={role === UserRoles.Student}
              onChange={handleRoleOptionChange}
            />
            Я студент
          </label>
          <label>
            <input
              type="radio"
              value={UserRoles.Teacher}
              checked={role === UserRoles.Teacher}
              onChange={handleRoleOptionChange}
            />
            Я викладач
          </label>
        </div>
      </div>
      <Button text="Зареєструватись" onClick={handleSubmit} disabled={isSubmitting} />
    </form>
  )
}