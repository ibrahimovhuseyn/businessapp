import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Label } from 'reactstrap'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../Utils/confiq'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { fetchPositions, fetchUsers } from '../Slices/homeSlice'

function CreateUser() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [validationErrors, setValdationErrors] = useState({})
  const [selectedPosition, setSelectedPosition] = useState(null)

  const { users, positions } = useSelector(store => store.homeSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!positions.length) {
      dispatch(fetchPositions())
    }
  }, [positions.length, dispatch])

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

    if (!data.name) errors.name = "Name is required"
    if (!data.surname) errors.surname = "Surname is required"
    if (!data.email) errors.email = "Email is required"
    if (!data.userName) errors.userName = "Username is required"
    if (!data.password) errors.password = "Password is required"
    if (!data.phone) errors.phone = "Phone number is required"

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

    if (Object.values(errors).filter(string => string).length) {
      toast.error("Please fill the boxes", toast_config)
      return
    }
    else if (data.password.length <= 5) {
      toast.error("Password length is minimum 6 characters", toast_config)
      return
    }
    else if (users.find(item => item.userName.toUpperCase() === data.userName.toUpperCase())) {
      toast.error("This username has been registered", toast_config)
      return
    }
    else if (!selectedPosition) {
      toast.error("Please select position", toast_config)
      return
    }

    axios.post(`${apiUrl}/users`, {
      name: data.name,
      surname: data.surname,
      userName: data.userName,
      password: data.password,
      email: data.email,
      phone: data.phone,
      positionId: selectedPosition.id,
      positionName: selectedPosition.name
    }).then(res => {
      e.target.reset()
      setSelectedPosition(null)
      setPassword('')
      dispatch(fetchUsers())
      toast.success("User successfully created", toast_config)
      navigate('/')
    })
  }

  // react-select üçün xüsusi kiber qaranlıq dizayn stilləri
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: '#0d1321',
      borderColor: state.isFocused ? '#00f3ff' : (validationErrors.positionId ? '#ff0055' : 'rgba(255, 255, 255, 0.08)'),
      boxShadow: state.isFocused ? '0 0 10px rgba(0, 243, 255, 0.2)' : 'none',
      '&:hover': { borderColor: '#00f3ff' },
      borderRadius: '10px',
      padding: '2px',
    }),
    menu: (base) => ({
      ...base,
      background: '#0f1424',
      border: '1px solid rgba(0, 243, 255, 0.2)',
      borderRadius: '10px',
    }),
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? '#00f3ff' : state.isFocused ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
      color: state.isSelected ? '#000' : '#e0e0e6',
      cursor: 'pointer',
      '&:active': { background: '#00f3ff', color: '#000' },
    }),
    singleValue: (base) => ({ ...base, color: '#ffffff' }),
    placeholder: (base) => ({ ...base, color: '#64748b', fontSize: '14px' })
  };

  return (
    <div className='createUser-layout'>
      <div className='form-container-wrapper'>
        <div className='form-card'>
          <h2 className='form-title'>Create <span>User</span></h2>
          <p className='form-subtitle'>Fill in the details to register a new employee on the hub</p>

          <Form onSubmit={handleCreateUser} className='modern-form-grid'>

            <div className="form-group-item">
              <Label className='form-label' htmlFor='name'>First Name</Label>
              <Input
                name='name'
                id='name'
                placeholder="John"
                className={`form-input ${validationErrors.name ? "border-danger-glow" : ""}`}
              />
              {validationErrors.name && <p className='error-text'>{validationErrors.name}</p>}
            </div>

            <div className="form-group-item">
              <Label className='form-label' htmlFor='surname'>Last Name</Label>
              <Input
                name='surname'
                id='surname'
                placeholder="Doe"
                className={`form-input ${validationErrors.surname ? "border-danger-glow" : ""}`}
              />
              {validationErrors.surname && <p className='error-text'>{validationErrors.surname}</p>}
            </div>

            <div className="form-group-item">
              <Label className='form-label' htmlFor='userName'>Username</Label>
              <Input
                name='userName'
                id='userName'
                placeholder="johndoe12"
                className={`form-input ${validationErrors.userName ? "border-danger-glow" : ""}`}
              />
              {validationErrors.userName && <p className='error-text'>{validationErrors.userName}</p>}
            </div>

            <div className="form-group-item">
              <Label className='form-label' htmlFor='phone'>Phone Number</Label>
              <Input
                name='phone'
                id='phone'
                placeholder="+994 (50) 000-0000"
                className={`form-input ${validationErrors.phone ? "border-danger-glow" : ""}`}
              />
              {validationErrors.phone && <p className='error-text'>{validationErrors.phone}</p>}
            </div>

            <div className="form-group-item full-width">
              <Label className='form-label' htmlFor='email'>Email Address</Label>
              <Input
                name='email'
                id='email'
                type='email'
                placeholder="johndoe@company.com"
                className={`form-input ${validationErrors.email ? "border-danger-glow" : ""}`}
              />
              {validationErrors.email && <p className='error-text'>{validationErrors.email}</p>}
            </div>

            <div className="form-group-item full-width">
              <Label className='form-label'>Position</Label>
              <Select
                styles={customSelectStyles}
                options={positions}
                value={selectedPosition}
                onChange={(selectedOption) => setSelectedPosition(selectedOption)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Select company role..."
              />
            </div>

            <div className="form-group-item full-width password-group">
              <Label className='form-label' htmlFor='password'>Account Password</Label>
              <div className="password-input-wrapper">
                <Input
                  value={password}
                  name='password'
                  id='password'
                  placeholder="••••••••"
                  className={`form-input ${validationErrors.password ? "border-danger-glow" : ""}`}
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                />
              </div>

              <div className="checkbox-wrapper">
                <Input
                  type='checkbox'
                  id='checkbox'
                  onChange={handleCheckboxChange}
                  checked={showPassword}
                />
                <Label htmlFor='checkbox' className='checkbox-label'>Show password</Label>
              </div>
              {validationErrors.password && <p className='error-text'>{validationErrors.password}</p>}
            </div>

            <div className='form-actions full-width'>
              <Button type='submit' className='submit-neon-btn'>Register User</Button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateUser