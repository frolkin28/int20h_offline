import { useState } from 'react'
import { SignInForm, SignUpForm } from "../../components"
import styles from "./Home.module.css"
import { Welcome } from '../../components/Welcome/Welcome'


enum PageMode {
    SignIn = "SignIn",
    SignUp = "SignUp"
}

export const HomePage = () => {
    const isSignedIn = false

    const [pageMode, setPageMode] = useState<PageMode>(PageMode.SignIn)

    const handleSwitchPageMode = () => {
        setPageMode((prevState) => prevState === PageMode.SignUp ? PageMode.SignIn : PageMode.SignUp)
    }

    let content = <Welcome/>;
    let switchText = ""
    if (pageMode === PageMode.SignIn) {
        content = <SignInForm />
        switchText = "Створити профіль"
    } else if (pageMode === PageMode.SignUp) {
        content = <SignUpForm />
        switchText = "У мене вже є профіль"
    }
    return (
      <div className={styles.container}>
        {content} 
          <a href="#" onClick={handleSwitchPageMode}>{switchText}</a>
      </div>
    )
}
