import styles from './Button.module.css'

interface ButtonProps {
  text: string
  onClick: () => void
  secondary?: boolean
  disabled?: boolean
}

export const Button = (props: ButtonProps) => {
  const { text, onClick, disabled, secondary } = props

  const buttonStyles = secondary
    ? `${styles.button} ${styles.buttonSecondary}`
    : styles.button

  return (
    <button
      className={buttonStyles}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
