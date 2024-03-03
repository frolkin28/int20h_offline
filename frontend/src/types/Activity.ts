import { Attendance } from './Attendance'

export interface ActivityItem {
  active_id: number
  type: string
  date: string
}

export interface Activity {
  id: number
  type: string
  date: string
  task_link: string | null
  subject: {
    id: number
    name: string
  }
  attendance: Attendance[]
}
