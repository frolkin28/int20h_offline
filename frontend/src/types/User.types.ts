export enum UserRole {
  Student = 1,
  Teacher = 2,
}

export interface User {
  email: string
  first_name: string
  last_name: string
  role: UserRole
}
