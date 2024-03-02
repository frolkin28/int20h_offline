import { useState } from 'react'
import { TextInput, Button } from '../..'
import styles from "./SignInUpForm.module.css"
import formStyles from "../Forms.module.css"

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const handleEmailChange = (value: string) => setEmail(value)
  const handlePasswordChange = (value: string) => setPassword(value)

  const handleSubmit = async () => {}

  return (
    <form className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        <div className={formStyles.inputContainer}>
          <label htmlFor="email">Email</label>
          <TextInput id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className={formStyles.inputContainer}>
          <label  htmlFor="password">Пароль</label>
          <TextInput id="password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
      </div>
      <Button text="Авторизуватись" onClick={handleSubmit} disabled={isSubmitting} />
    </form>
  )
}
