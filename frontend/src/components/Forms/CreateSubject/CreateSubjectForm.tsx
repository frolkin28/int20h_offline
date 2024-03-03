import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Group } from '../../../types'
import axios from 'axios'
import { AuthContext } from '../../../AuthContext'
import formStyles from '../Forms.module.css'
import { TextInput } from '../../Inputs/TextInput'
import { ActivityDto } from '../../../types'
import { ActivityItemForm } from './ActivityItemForm'
import {Button} from "../../Buttons/Button";
import styles from "./CreateSubjectForm.module.css"

const getEmptyActivity = () => ({
  type: undefined,
  task_link: '',
  date: undefined,
})

export const CreateSubjectForm = () => {
  const { token } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
  const [activities, setActivities] = useState<ActivityDto[]>([getEmptyActivity()])

  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/groups`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setGroups(response.data.data)
    })()
  }, [])

  const handleNameChange = (value: string) => setName(value)

  const handleGroupSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value.length) {
      setSelectedGroupId(Number(event.target.value))
    }
  }

  const addActivity = () => setActivities([...activities, getEmptyActivity()])
  const removeActivity = () => setActivities([...activities.slice(0, -1)])

  const handleSubmit = async () => {
    console.log(activities)
    try {
      const filteredActivities = activities.filter((activity) => activity.date?.length && activity.task_link?.length && activity.type?.length)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/journal/`,
        {
          name,
          group_id: selectedGroupId,
          activities: filteredActivities
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("СТВОРИВ БЛЯТЬ", response.data.data)
    } catch (error: any) {
      console.log(error)
      alert("Сталася помилка")
    } finally {

    }
  }

  const groupSelect = (
    <select onChange={handleGroupSelect}>
      <option value="">Оберіть групу</option>
      {groups.map((group) => (
        <option value={group.id}>{group.name}</option>
      ))}
    </select>
  )

  const renderedActivities = activities.map((activity, index) => {
    const handleTypeChange = (type: string) => {
      const activitiesCopy = [...activities]
      activitiesCopy[index].type = type
      setActivities(activitiesCopy)
    }

    const handleLinkChange = (link: string) => {
      const activitiesCopy = [...activities]
      activitiesCopy[index].task_link = link
      setActivities(activitiesCopy)
    }

    const handleDateChange = (date: string) => {
      const activitiesCopy = [...activities]
      activitiesCopy[index].date = new Date(date).toISOString()
      setActivities(activitiesCopy)
    }

    return (
      <ActivityItemForm
        typeOnChange={handleTypeChange}
        taskLinkOnChange={handleLinkChange}
        dateOnChange={handleDateChange}
      />
    )
  })

  return (
    <div>
      <form>
        <div className={formStyles.inputContainer}>
          <label htmlFor="name">Назва</label>
          <TextInput id="name" value={name} onChange={handleNameChange} />
        </div>
        {groupSelect}
        <div className={styles.activitiesWrapper}>
          {renderedActivities}
        </div>
        <button onClick={addActivity} type="button">Add</button>
        <button onClick={removeActivity} type="button" disabled={activities.length === 1}>Remove</button>
        <Button text="Створити" onClick={handleSubmit} disabled={false} />
      </form>
    </div>
  )
}
