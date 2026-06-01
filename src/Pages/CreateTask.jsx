import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Label } from 'reactstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../Utils/confiq'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../Slices/homeSlice'

function CreateTask() {
  const { users } = useSelector(store => store.homeSlice)
  const [validationErrors, setValidationErrors] = useState({})
  const [selectedUser, setSelectedUser] = useState(null) // react-select dəyərini tutmaq üçün state
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  function validation(data) {
    const errors = {
      userId: "",
      title: "",
      description: "",
      deadLine: ""
    }
    if (!data.userId) {
      errors.userId = "Please select the worker"
    }
    if (!data.title) {
      errors.title = "Please note the title"
    }
    if (!data.description) {
      errors.description = "Please write the description"
    }
    if (!data.deadLine) {
      errors.deadLine = "Please note the dead line"
    } else {
      const selectedDate = new Date(data.deadLine).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        errors.deadLine = "Deadline must be at least one day after today"
      }
    }
    return errors
  }

  const handleCreateTask = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    // Standart FormData-da düşməyən react-select dəyərini state-dən əlavə edirik
    data.userId = selectedUser ? selectedUser.id : "";

    const errors = validation(data)
    setValidationErrors(errors)

    if (Object.values(errors).filter(string => string).length) {
      toast.error("Please fill the boxes correctly", toast_config)
      return
    }

    axios.post(`${apiUrl}/tasks`, {
      userId: data.userId,
      title: data.title,
      description: data.description,
      deadLine: data.deadLine,
      status: "not started",
      isFinished: false
    }).then(res => {
      toast.success("Successfully created", toast_config)
      e.target.reset()
      setSelectedUser(null)
      navigate('/')
    })
  }

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
  }, [dispatch])

  const sortedData = users ? [...users].sort((a, b) => a.name.localeCompare(b.name)) : [];

  // react-select üçün xüsusi kiber qaranlıq dizayn stilləri
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: '#0d1321',
      borderColor: state.isFocused ? '#00f3ff' : (validationErrors.userId ? '#ff0055' : 'rgba(255, 255, 255, 0.08)'),
      boxShadow: state.isFocused ? '0 0 10px rgba(0, 243, 255, 0.2)' : 'none',
      '&:hover': { borderColor: '#00f3ff' },
      borderRadius: '10px',
      padding: '3px',
    }),
    menu: (base) => ({
      ...base,
      background: '#0f1424',
      border: '1px solid rgba(0, 243, 255, 0.2)',
      borderRadius: '10px',
      zIndex: 10
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? '#00f3ff' : state.isFocused ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
      color: state.isSelected ? '#000' : '#e0e0e6',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({ ...base, color: '#ffffff' }),
    placeholder: (base) => ({ ...base, color: '#64748b', fontSize: '14.5px' })
  };

  return (
    <div className='createTask-layout'>

      <div className='task-container-wrapper'>
        <div className='task-card'>
          <h2 className='task-title'>Assign <span>New Task</span></h2>
          <p className='task-subtitle'>Fill out the structural form to push a job assignment to the pipeline</p>

          <Form onSubmit={handleCreateTask} className='modern-task-form'>

            <div className="task-form-group">
              <Label className='task-label'>Assignee (Employee)</Label>
              <Select
                value={selectedUser}
                onChange={(option) => setSelectedUser(option)}
                options={sortedData}
                isClearable
                styles={customSelectStyles}
                getOptionLabel={option => option.name + " " + option.surname}
                getOptionValue={option => option.id}
                placeholder="Search and select worker..."
              />
              {validationErrors.userId && <p className='error-glow-text'>{validationErrors.userId}</p>}
            </div>

            <div className="task-form-group">
              <Label className='task-label' htmlFor='title'>Task Heading / Title</Label>
              <Input
                name='title'
                id='title'
                placeholder="e.g., Optimize Database Queries"
                className={`task-input ${validationErrors.title ? "border-danger-glow" : ""}`}
              />
              {validationErrors.title && <p className='error-glow-text'>{validationErrors.title}</p>}
            </div>

            <div className="task-form-group">
              <Label className='task-label' htmlFor='description'>Detailed Description</Label>
              <Input
                name='description'
                id='description'
                type="textarea"
                rows="4"
                placeholder="Describe the workflow, requirements, and scope of work..."
                className={`task-input textarea-input ${validationErrors.description ? "border-danger-glow" : ""}`}
              />
              {validationErrors.description && <p className='error-glow-text'>{validationErrors.description}</p>}
            </div>

            <div className="task-form-group">
              <Label className='task-label' htmlFor='deadLine'>Deadline Limit</Label>
              <Input
                name='deadLine'
                id='deadLine'
                type='date'
                min={getTomorrowDateString()}
                className={`task-input date-input ${validationErrors.deadLine ? "border-danger-glow" : ""}`}
              />
              {validationErrors.deadLine && <p className='error-glow-text'>{validationErrors.deadLine}</p>}
            </div>

            <div className='task-action-area'>
              <Button type='submit' className='submit-task-btn'>Deploy Task</Button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateTask