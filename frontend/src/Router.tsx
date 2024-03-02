import { createBrowserRouter } from 'react-router-dom'
import { NavbarLayout } from './layouts'
import { HomePage } from "./pages"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarLayout />,
    errorElement: <h1>Сторінка не знайдена</h1>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
])
