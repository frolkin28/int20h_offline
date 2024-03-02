import styles from './Welcome.module.css'
import { PesPatron } from '../PesPatron/PesPatron'

interface WelcomeProps {
  firstName?: string
  lastName?: string
}

export const Welcome = (props: WelcomeProps) => {
  const { firstName, lastName } = props

  const text =
    firstName && lastName ? `Вітаємо, ${lastName} ${firstName}!` : 'Вітаємо!'

  return (
    <div className={styles.welcomeMessage}>
      <p>{text}</p>
      <PesPatron />
    </div>
  )
}
