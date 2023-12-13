import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Label } from 'reactstrap'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../Utils/confiq'
import { useSelector } from 'react-redux'
import AdminHeader from '../Components/AdminHeader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [validationErrors, setValdationErrors] = useState({})

  const { users } = useSelector(store => store.homeSlice)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setPassword(e.target.value)
  }

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked)
  }

  function validate(data) {
    const errors = {
      name: "",
      surname: "",
      email: "",
      userName: "",
      password: "",
      phone: ""
    }


    if (!data.name) {
      errors.name = "Name is required"
    }
    if (!data.surname) {
      errors.surname = "Surname is required"
    }
    if (!data.email) {
      errors.email = "Email is required"
    }
    if (!data.userName) {
      errors.userName = "Username is required"
    }
    if (!data.password) {
      errors.password = "Password is required"
    }
    if (!data.phone) {
      errors.phone = "Phone number is required"
    }
    return errors
  }


  function handleCreateUser(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    const errors = validate(data)
    setValdationErrors(errors)


    if (Object.values(validationErrors).filter(string => string).length) {
      toast.error("Please filled the boxes", toast_config)
      return
    }
    else if (data.password.length <= 5) {
      toast.error("Password length is minimum 6 characters")
      return
    }
    else if (users.find(item => item.userName.toUpperCase() === data.userName.toUpperCase())) {
      toast.error("This username has been registered", toast_config)
      return
    }
    axios.post(`${apiUrl}/users`, {
      name: data.name,
      surname: data.surname,
      userName: data.userName,
      password: data.password,
      email: data.email,
      phone: data.phone
    }).then(res => {
      e.target.reset()
      toast.success("User successfully created", toast_config)
      navigate('/adminhome')
    })
  }


  return (
    <div className='createUser'>
      <AdminHeader />
      <h2 className='text-center'>Create User</h2>
      <Form
        onSubmit={e => {
          handleCreateUser(e)
        }}
      >
        <div className="mb-3 mx-5">
          <Label
            className='fw-bold'
            htmlFor='name'
          >
            Enter user's first name
          </Label>
          <Input
            name='name'
            id='name'
            className={`${validationErrors.name ? "border border-danger w-50" : ""} w-50`}
          />
          {
            validationErrors.name &&
            <p className='text-danger fw-bold'>{validationErrors.name}</p>
          }
        </div>
        <div className="mb-3 mx-5">
          <Label
            className='fw-bold'
            htmlFor='surname'
          >
            Enter user's last name
          </Label>
          <Input
            name='surname'
            id='surname'
            className={`${validationErrors.surname ? "border border-danger w-50" : ""} w-50`}
          />
          {
            validationErrors.surname &&
            <p className='text-danger fw-bold'>{validationErrors.surname}</p>
          }
        </div>
        <div className="mb-3 mx-5">
          <Label
            className='fw-bold'
            htmlFor='userName'
          >
            Enter user's username
          </Label>
          <Input
            name='userName'
            id='userName'
            className={`${validationErrors.userName ? "border border-danger w-50" : ""} w-50`}

          />
          {
            validationErrors.userName &&
            <p className='text-danger fw-bold'>{validationErrors.userName}</p>
          }
        </div>
        <div className="mb-3 mx-5">
          <Label
            className='fw-bold'
            htmlFor='phone'
          >
            Enter user's phone number
          </Label>
          <Input
            name='phone'
            id='phone'
            className={`${validationErrors.phone ? "border border-danger w-50" : ""} w-50`}

          />
          {
            validationErrors.phone &&
            <p className='text-danger fw-bold'>{validationErrors.phone}</p>
          }
        </div>
        <div className="mb-3 mx-5">
          <Label
            className='fw-bold'
            htmlFor='email'
          >
            Enter user's email adress
          </Label>
          <Input
            name='email'
            id='email'
            className={`${validationErrors.email ? "border border-danger w-50" : ""} w-50`}

            type='email'
          />
          {
            validationErrors.email &&
            <p className='text-danger fw-bold'>{validationErrors.email}</p>
          }
        </div>
        <div className="mb-3 mx-5">
          <Label
            className='fw-bold'
            htmlFor='password'
          >
            Enter user's password
          </Label>
          <Input
            defaultValue={password}
            name='password'
            id='password'
            className={`${validationErrors.password ? "border border-danger w-50" : ""} w-50`}
            onChange={e => handleInputChange(e)}
            type={showPassword ? "text" : "password"}

          />
          <Input
            type='checkbox'
            id='checkbox'
            onChange={handleCheckboxChange}
          />
          <Label
            htmlFor='checkbox'
          >
            Show password
          </Label>
          {
            validationErrors.password &&
            <p className='text-danger fw-bold'>{validationErrors.password}</p>
          }
        </div>
        <Button color='primary' className='mx-5'>Submit</Button>
      </Form>
    </div>
  )
}

export default CreateUser