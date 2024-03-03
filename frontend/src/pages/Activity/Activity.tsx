import { useParams } from 'react-router-dom'
import { AttendanceList } from '../../components'

export const Activity = () => {
  const { id } = useParams<{ id: string }>()

  return <AttendanceList activityId={Number(id)} />
}
