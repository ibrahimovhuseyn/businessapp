import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'reactstrap'
import { apiUrl, toast_config } from '../Utils/confiq'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../Slices/homeSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FaUserLarge, FaPhone } from "react-icons/fa6";

function ResetPassword() {
    const dispatch = useDispatch()
    const { users } = useSelector(store => store.homeSlice)

    const [password, setPassword] = useState(null)

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers())
        }
    }, [dispatch])

    const handlePassword = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {}
        for (const [key, value] of formData.entries()) {
            data[key] = value
        }

        const passwordData = users.find(item => item.userName == data.userName && item.phone == data.phone)

        if (passwordData) {
            setPassword(passwordData.password)
            e.target.reset()
        } else {
            toast.error("User not found", toast_config)
        }
    }

    return (
        <div className='resetPassword'>
            <Form onSubmit={(e) => handlePassword(e)}>
                <div className='page'>
                    <h2>Password Recovery</h2>

                    <div className="userName">
                        <Input
                            placeholder='Enter your username'
                            name='userName'
                            type='text'
                            required
                            onChange={() => setPassword(null)} // Xəta aradan qaldırıldı, lokal state sıfırlanır
                        />
                        <div className='i'>
                            <FaUserLarge className='is' />
                        </div>
                    </div>

                    <div className="phone">
                        <Input
                            placeholder='Enter your phone number'
                            name='phone'
                            type='text'
                            required
                        />
                        <div className='i'>
                            <FaPhone className='is' />
                        </div>
                    </div>

                    <Button type='submit'>
                        Search Account
                    </Button>

                    {password && (
                        <div className="password-result animate-fade-in">
                            <p>Your password is:</p>
                            <span className="retrieved-pass">{password}</span>
                        </div>
                    )}

                    <div className='list'>
                        <ul>
                            <li>
                                <Link to={'/signin'}>Back to Login</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default ResetPassword