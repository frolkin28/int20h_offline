export interface Attendance {
  student: {
    id: number
    first_name: string
    last_name: string
  }
  attendance: {
    id: number
    mark: string | null
  } | null
}
