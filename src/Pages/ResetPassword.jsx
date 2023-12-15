import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'reactstrap'
import { apiUrl, toast_config } from '../Utils/confiq'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../Slices/homeSlice'
import { toast } from 'react-toastify'

function ResetPassword() {
    const dispatch = useDispatch()
    const { users } = useSelector(store => store.homeSlice)

    const [password, setPassword] = useState(null)

    console.log(password);
    useEffect(() => {
        axios.get(`${apiUrl}/users`).then(res => dispatch(getUsers(res.data)))
    }, [])


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
        }
        else {
            toast.error("user cant find", toast_config)
            setPassword(false)
        }
    }



    return (
        <div>
            <h1 className='text-center'>Password recovery</h1>
            <Form
                onSubmit={(e) => handlePassword(e)}
                className='my-5 mx-5'
            >
                <Input
                    className='w-50 my-2'
                    placeholder='Enter your username'
                    name='userName'
                />
                <Input
                    className='w-50 my-4'
                    placeholder='Enter your phone number'
                    name='phone'
                />
                <Button
                    type='submit'
                    color='primary'
                >
                    Search
                </Button>
            </Form>
            {
                password &&
                <p className='mx-5' style={{fontSize : "2rem"}}>Your password is : {password}</p>
            }
        </div>
    )
}

export default ResetPassword