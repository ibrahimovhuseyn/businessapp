import React, { useEffect, useState } from 'react'
import { Input, Button, Form, Label } from 'reactstrap'
import { FaUserLarge } from "react-icons/fa6";
import { IoIosUnlock } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {  toast_config } from '../Utils/confiq';
import { useDispatch, useSelector } from 'react-redux'
import {  fetchAllData, setCurrentUser } from '../Slices/homeSlice';



function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { data } = useSelector(store => store.homeSlice)
    const { users } = data
    const dispatch = useDispatch()
    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchAllData())
        }
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
            return
        }
        else {
            localStorage.setItem("isAuth", true)
            localStorage.setItem("currentUser", JSON.stringify(selectedUser))
            dispatch(setCurrentUser(selectedUser))
            navigate('/')
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
    <Form
        onSubmit={e => {
            handleLogin(e)
        }}
    >
        <div className='page'>
            <h2>İstifadəçi Girişi</h2>
            
            <div className="userName">
                <Input
                    name='userName'
                    placeholder='İstifadəçi adınızı daxil edin'
                />
                <div className='i'>
                    <FaUserLarge className='is' />
                </div>
            </div>

            <div className="password">
                <Input
                    onChange={e => handleInputChange(e)}
                    placeholder='Şifrənizi daxil edin'
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
                    <Label htmlFor='password' className='fw-bold my-1 mx-1'>Şifrəni göstər</Label>
                </div>
            </div>

            <Button
                type='submit'
            >Daxil ol
            </Button>

            <div className='list'>
                <ul>
                    <li>
                        <Link to={'/resetpassword'}>Şifrəni unutmusan?</Link>
                    </li>
                    <li>
                        <Link to={'/order'}>İnzibatçı ilə əlaqə</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Ana Səhifə</Link>
                    </li>
                </ul>
            </div>
        </div>
    </Form>
</div>
    )
}

export default SignIn