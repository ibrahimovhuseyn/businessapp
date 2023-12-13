import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import { Button, Form, Input, Label } from 'reactstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../Utils/confiq'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../Slices/homeSlice'

function CreateTask() {
  const { users } = useSelector(store => store.homeSlice)
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()
  const disptach = useDispatch()

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
    }
    return errors
  }

  const handleCreateTask = (e) => {
    e.preventDefault()
    const data = {}
    const formData = new FormData(e.target)
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    const errors = validation(data)
    setValidationErrors(errors)
    if (Object.values(errors).filter(string => string).length) {
      toast.error("Please filled the boxes", toast_config)
      return
    }
    axios.post(`${apiUrl}/tasks`, {
      userId: data.userId,
      title: data.title,
      description: data.description,
      deadLine: data.deadLine,
      status: 0,
      isFinished: false
    }).then(res => {
      toast.success("Successfully", toast_config)
      e.target.reset()
      navigate('/adminhome')
    })
  }

  useEffect(() => {
    axios.get(`${apiUrl}/users`).then(res => disptach(getUsers(res.data)))
  }, [])

  const sortedData = [...users].sort((a, b) => a.name.localeCompare(b.name));


  return (
    <div className='createTask px-5'>
      <AdminHeader />
      <h2 className='text-center my-3'>Create task</h2>
      <div className='form'>
        <Form
          onSubmit={(e) => {
            handleCreateTask((e))
          }}
        >
          <div>
            <Label className='fw-bold'>Select the employee you will assign the task to:</Label>
            <Select
              name='userId'
              isClearable
              options={sortedData}
              getOptionLabel={option => option.name + "  " + option.surname}
              getOptionValue={option => option.id}
              className={`${validationErrors.userId ? "border border-danger w-50 my-2" : ""}w-50 my-2`}
            />
            {
              validationErrors.userId &&
              <p className='fw-bold text-danger'>{validationErrors.userId}</p>
            }
          </div>
          <div>
            <Label htmlFor='title' className='fw-bold'>Show the title of the task</Label>
            <Input
              name='title'
              id='title'
              className={`${validationErrors.title ? "border border-danger w-50 my-2" : ""}w-50 my-2`}

            />
            {
              validationErrors.title &&
              <p className='fw-bold text-danger'>{validationErrors.title}</p>
            }
          </div>
          <div>
            <Label className='fw-bold' htmlFor='description'>Write the description of the task</Label>
            <Input
              name='description'
              type="textarea"
              className={`${validationErrors.description ? "border border-danger w-50 my-2" : ""}w-50 my-2`}

            />
            {
              validationErrors.description &&
              <p className='fw-bold text-danger'>{validationErrors.description}</p>
            }
          </div>
          <div>
            <Label className='fw-bold'>Note dead line of the task</Label>
            <Input
              name='deadLine'
              className={`${validationErrors.deadLine ? "border border-danger w-50 my-2" : ""}w-50 my-2`}
              type='date'
            />
            {
              validationErrors.deadLine &&
              <p className='fw-bold text-danger'>{validationErrors.deadLine}</p>
            }
          </div>
          <Button color='primary'>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateTask