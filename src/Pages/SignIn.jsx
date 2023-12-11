import React, { useEffect, useState } from 'react'
import { Input, Button, Form, Label } from 'reactstrap'
import { FaUserLarge } from "react-icons/fa6";
import { IoIosUnlock } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../Utils/confiq';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getTasks, setUsers } from '../Slices/signInSlice';



function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { users, currentUser, tasks } = useSelector(store => store.signInSlice)
    const navigate = useNavigate()


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`${apiUrl}/users`).then(res => dispatch(setUsers(res.data)))
        axios.get(`${apiUrl}/tasks`).then(res => dispatch(getTasks(res.data)))
        localStorage.setItem("isAuth", false)
        localStorage.setItem("currentUser", JSON.stringify({
            userName: "",
            password: ""
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {}
        for (const [key, value] of formData.entries()) {
            data[key] = value
        }
        const { userName, password } = data
        const selectedUser = users.find(item => item.userName === userName && item.password === password)


        if (!selectedUser) {
            toast.error("Please enter the true data", toast_config)
            return
        }
        else {
            localStorage.setItem("isAuth", true)
            localStorage.setItem("currentUser", JSON.stringify(selectedUser))
            toast.success("Successfuly enter", toast_config)
            {
                data.userName === 'admin' ? navigate('/adminhome') : navigate('/')
            }
        }
    }

    const handleInputChange = (e) => {
        setPassword(e.target.value)
    }

    const handleCheckboxChange = (e) => {
        setShowPassword(e.target.checked)
    }

    return (
        <div className='signIn'>
            <p></p>
            <Form
                onSubmit={e => {
                    handleLogin(e)
                }}
            >
                <div className='page'>
                    <h2>User Login</h2>
                    <div className="userName">
                        <Input
                            name='userName'
                        />
                        <div className='i'>
                            <FaUserLarge className='is' />
                        </div>

                    </div>
                    <div className="password">
                        <Input
                            onChange={e => handleInputChange(e)}
                            name='password'
                            type={showPassword ? "text" : "password"}
                            value={password}
                        />
                        <div className='i'>
                            <IoIosUnlock className='is' />
                        </div>
                        <div className="d-flex align-items-center">
                            <input type="checkbox"
                                className='check'
                                onChange={handleCheckboxChange}
                                id='password'
                            />
                            <Label htmlFor='password' className='fw-bold my-1 mx-1'>Show password</Label>
                        </div>
                    </div>
                    <Button
                        type='submit'
                    >Login
                    </Button>
                    <div className='list'>
                        <ul>
                            <li>
                                <Link>Parolumu unutmuşam</Link>
                            </li>
                            <li>
                                <Link to={'/registration'}>Yeni qeydiyyat</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Form>

        </div>
    )
}

export default SignIn