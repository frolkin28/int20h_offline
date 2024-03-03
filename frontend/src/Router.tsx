import { createBrowserRouter } from 'react-router-dom'
import { NavbarLayout } from './layouts'
import {
  HomePage,
  SubjectsPage,
  GroupsPage,
  CreateGroupPage,
  Subject,
} from './pages'

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
      {
        path: '/groups',
        element: <GroupsPage />,
      },
      {
        path: '/groups/create',
        element: <CreateGroupPage />,
      },
      {
        path: '/subjects',
        element: <SubjectsPage />,
      },
      {
        path: '/subjects/create',
        element: <HomePage />,
      },
      {
        path: '/subject/:id',
        element: <Subject />,
      },
      {
        path: '/activity/:id',
        element: <HomePage />,
      },
    ],
  },
])
