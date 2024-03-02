import { RouterProvider } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useAuth } from './hooks'
import { router } from './Router'

const App = () => {
  const { token, isSignedIn, login, logout } = useAuth()

  return (
    <AuthContext.Provider value={{ token, isSignedIn, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
