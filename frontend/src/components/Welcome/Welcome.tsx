import styles from './Welcome.module.css'
import { PesPatron } from '../PesPatron/PesPatron'

export const Welcome = () => {
    
    return (
        <div className={styles.welcomeMessage}>
            <p>Вітаємо, Фоменко Анастасія Сергіївна! </p>
            <PesPatron/>
        </div>
    )
  }