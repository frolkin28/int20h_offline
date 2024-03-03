import { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { AuthContext } from '../../AuthContext'
import { UserRole } from '../../types'

export const Navbar = () => {
  const { user, isSignedIn, logout } = useContext(AuthContext)

  let links
  if (user?.role === UserRole.Student) {
    links = (
      <>
        <li>
          <RouterLink to={'/account'}>Аккаунт</RouterLink>
        </li>
        <li>
          <RouterLink to={'/groups'}>Групи</RouterLink>
        </li>
        <li>
          <RouterLink to={'/subjects'}>Мої предмети</RouterLink>
        </li>
      </>
    )
  }
  if (user?.role === UserRole.Teacher) {
    links = (
      <>
        <li>
          <RouterLink to={'/account'}>Аккаунт</RouterLink>
        </li>
        <li>
          <RouterLink to={'/groups'}>Групи</RouterLink>
        </li>
        <li>
          <RouterLink to={'/subjects'}>Оцінювання</RouterLink>
        </li>
        <li>
          <RouterLink to={'/subjects'}>Рейтинг</RouterLink>
        </li>
        <li>
          <RouterLink to={'/newsletter'}>Створити розсилку</RouterLink>
        </li>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <RouterLink to="/" className={styles.linkLogo}>
          <p className={styles.logo}>campus</p>
        </RouterLink>
        <ul>{links}</ul>
      </div>
      {isSignedIn ? (
        <a href="#" onClick={logout}>
          Вийти
        </a>
      ) : null}
    </div>
  )
}
