import styles from './PesPatron.module.css'

export const PesPatron = () => {
  const imageUlr = 'https://dq5d23gxa9vto.cloudfront.net/logo.png'

  return <img className={styles.picture} src={imageUlr} />
}
