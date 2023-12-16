import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../Utils/confiq'
import { getTasks, getUsers } from '../Slices/homeSlice'
import Header from '../Components/Header/Header'
import { useNavigate } from 'react-router-dom'



function Home() {
    const { currentUser, users} = useSelector(store => store.homeSlice)
    const dispact = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setData()
    }, [])



    console.log(users);

    const setData = () => {
        axios.get(`${apiUrl}/users`).then(res => dispact(getUsers(res.data)))
        axios.get(`${apiUrl}/tasks`).then(res => dispact(getTasks(res.data)))
    }


    return (
        <div className='home'>
            <div className="container">
                <Header />
            </div>
        </div>
    )
}

export default Home














