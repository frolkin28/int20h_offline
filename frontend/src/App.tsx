import { RouterProvider } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useAuth } from './hooks'
import { router } from './Router'

const App = () => {
  const { user, token, isSignedIn, isStorageChecked, login, logout } = useAuth()

  return (
    <AuthContext.Provider
      value={{ user, token, isSignedIn, isStorageChecked, login, logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
