import formStyles from '../Forms.module.css'
import { ChangeEvent } from 'react'
import styles from './CreateSubjectForm.module.css'

const types = ['lecture', 'practice', 'laboratory', 'test', 'exam']

export interface ActivityItemFormProps {
  typeOnChange: (value: string) => void
  taskLinkOnChange: (value: string) => void
  dateOnChange: (value: string) => void
}

export const ActivityItemForm = (props: ActivityItemFormProps) => {
  const { typeOnChange, taskLinkOnChange, dateOnChange } = props

  const handleTypeSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value.length) {
      typeOnChange(event.target.value)
    }
  }

  const groupSelect = (
    <select onChange={handleTypeSelect}>
      <option value="">Оберіть тип івенту:</option>
      {types.map((type) => (
        <option value={type}>{type}</option>
      ))}
    </select>
  )

  const handleTaskLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    taskLinkOnChange(event.target.value)
  }

  const handleDatetimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dateOnChange(e.target.value)
  }

  return (
    <div className={styles.activityFormContainer}>
      {groupSelect}
      <div className={formStyles.inputContainer}>
        <label htmlFor="name">Посилання на завдання</label>
        <input type="text" onChange={handleTaskLinkChange} />
      </div>
      <div>
        <input type="date" name="date-time" onChange={handleDatetimeChange} />
      </div>
    </div>
  )
}
