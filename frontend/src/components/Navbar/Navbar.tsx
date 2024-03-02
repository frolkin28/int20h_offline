import { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { AuthContext } from '../../AuthContext'
import { UserRole } from '../../types'

export const Navbar = () => {
  const { user } = useContext(AuthContext)

  let links
  if (user?.role === UserRole.Student) {
    links = (
      <>
        <li>
          <RouterLink to={'/lots/edit'}>Редагувати</RouterLink>
        </li>
        <li>
          <RouterLink to={'/lots/edit'}>Редагувати</RouterLink>
        </li>
        <li>
          <RouterLink to={'/lots/edit'}>Редагувати</RouterLink>
        </li>
      </>
    )
  }
  if (user?.role === UserRole.Teacher) {
    links = (
      <>
        <li>
          <RouterLink to={'/groups'}>Групи</RouterLink>
        </li>
        <li>
          <RouterLink to={'/evaluation'}>Оцінювання</RouterLink>
        </li>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <ul>{links}</ul>
    </div>
  )
}
