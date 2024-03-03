import { useContext, useEffect, useState } from 'react'
import { SignInForm, SignUpForm, Welcome } from '../../components'
import { AuthContext } from '../../AuthContext'
import styles from './Home.module.css'

enum PageMode {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Welcome = 'Welcome',
}

export const HomePage = () => {
  const { isSignedIn, user } = useContext(AuthContext)

  const [pageMode, setPageMode] = useState<PageMode>(PageMode.SignIn)

  useEffect(() => {
    if (isSignedIn) {
      setPageMode(PageMode.Welcome)
    } else {
      setPageMode(PageMode.SignIn)
    }
  }, [isSignedIn])

  const handleSwitchPageMode = () => {
    setPageMode((prevState) =>
      prevState === PageMode.SignUp ? PageMode.SignIn : PageMode.SignUp
    )
  }

  let content = (
    <Welcome firstName={user?.first_name} lastName={user?.last_name} />
  )
  let switchText = ''
  if (pageMode === PageMode.SignIn) {
    content = <SignInForm />
    switchText = 'Створити профіль'
  } else if (pageMode === PageMode.SignUp) {
    content = <SignUpForm />
    switchText = 'У мене вже є профіль'
  }

  return (
    <div className={styles.container}>
      {content}
      <a href="#" onClick={handleSwitchPageMode}>
        {switchText}
      </a>
    </div>
  )
}
