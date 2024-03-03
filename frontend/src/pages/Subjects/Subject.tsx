import { useParams } from 'react-router-dom'
import { ActivitiesList } from '../../components/ActivitiesList/ActivitiesList'

export const Subject = () => {
  const { id } = useParams<{ id: string }>()

  return <ActivitiesList subjectId={Number(id)} />
}
