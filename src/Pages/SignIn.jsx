import React, { useEffect, useState } from 'react'
import { Input, Button, Form, Label } from 'reactstrap'
import { FaUserLarge } from "react-icons/fa6";
import { IoIosUnlock } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiUrl, toast_config } from '../Utils/confiq';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getUsers } from '../Slices/homeSlice';



function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { users } = useSelector(store => store.homeSlice)
    const dispatch = useDispatch()


    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify({
            userName: "",
            id: ""
        })),
            axios.get(`${apiUrl}/users`).then(res => dispatch(getUsers(res.data)))
    }, [])

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
            console.log(data);
            return
        }
        else {
            localStorage.setItem("isAuth", true)
            localStorage.setItem("currentUser", JSON.stringify(selectedUser))
            selectedUser.userName === "admin" ? navigate('/adminhome') : navigate('/')
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
                                <Link to={'/resetpassword'}>Forget password</Link>
                            </li>
                            <li>
                                <Link to={'/registration'}>New registration</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Form>

        </div>
    )
}

export default SignIn