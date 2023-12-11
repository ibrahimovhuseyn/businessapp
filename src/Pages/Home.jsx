import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'reactstrap'
import { apiUrl, toast_config } from '../Utils/confiq'
import { getMyTasks } from '../Slices/homeSlice'
import { FaCircle } from "react-icons/fa";
import { toast } from 'react-toastify'


function Home() {
    const navigate = useNavigate()
    const { currentUser } = useSelector(store => store.signInSlice)
    const { myTasks } = useSelector(store => store.homeSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${apiUrl}/tasks?userId=${currentUser.id}`).then(res => dispatch(getMyTasks(res.data)))
    }, [])
    const logOut = () => {
        localStorage.setItem("isAuth", false)
        localStorage.setItem("currentUser", JSON.stringify({
            userName: "",
            password: ""
        }))
        navigate('/signin')
    }
    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'red';
            case 1:
                return 'yellow';
            // Əlavə statuslar üçün təyinatlar
            case 2:
                return 'green'
        }
    };

    const setStatusStart = (task) => {
        if (task.status === 2) {
            toast.error("Already has been finished ")
            return
        }
        else {
            axios.put(`${apiUrl}/tasks/${task.id}`, {
                deadLine: task.deadLine,
                description: task.description,
                id: task.id,
                status: 1,
                title: task.title,
                userId: task.userId
            }).then(toast.success("Successfuly edited", toast_config))
        }
    }
    const setStatusFinish = (task) => {
        if (task.status === 2) {
            toast.error("Already has been finished")
            return
        }
        else if (task.status === 0 ) {
            toast.error("At first you start")
            return
        }
        else {
            axios.put(`${apiUrl}/tasks/${task.id}`, {
                deadLine: task.deadLine,
                description: task.description,
                id: task.id,
                status: 2,
                title: task.title,
                userId: task.userId
            }).then(toast.success("Successfuly edited", toast_config))
        }
    }


    return (
        <div className='home container'>
            <div className="d-flex">
                <h1>Welcome : {currentUser.name}</h1>
                <Button
                    onClick={() => {
                        logOut()
                    }}
                >
                    cixis
                </Button>
            </div>
            <div className='tasks'>
                <h3 className='mt-4 text-center'>My tasks</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Reaction</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            myTasks.map(item => (
                                <tr key={item.id}>
                                    <td>1</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.deadLine}</td>
                                    <td>
                                        <FaCircle
                                            style={{ color: getStatusColor(item.status) }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setStatusStart(item)
                                            }}
                                        >
                                            Start
                                        </button>
                                        <button
                                            onClick={
                                                () => {
                                                    setStatusFinish(item)
                                                }
                                            }
                                        >
                                            Finish
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default Home