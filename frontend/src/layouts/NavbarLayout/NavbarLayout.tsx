import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components'
import styles from './NavbarLayout.module.css'

export const NavbarLayout = () => {
  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  )
}
