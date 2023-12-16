import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { apiUrl } from '../Utils/confiq'
import { getTasks, getUsers } from '../Slices/homeSlice'
import { Table, Button } from 'reactstrap'
import { FaCircle } from "react-icons/fa";
import { toast } from 'react-toastify'
import { toast_config } from '../Utils/confiq';


function UserProfile() {
    const { id } = useParams()
    const { currentUser, users, tasks } = useSelector(store => store.homeSlice)
    const dispatch = useDispatch()
    const user = users.find(item => item.id == currentUser.id)

    useEffect(() => {
        axios.get(`${apiUrl}/users`).then(res => dispatch(getUsers(res.data)))
        axios.get(`${apiUrl}/tasks`).then(res => dispatch(getTasks(res.data)))

    }, [])

    const name = currentUser?.userName
    const currentUserId = currentUser?.id


    const owner = users?.find(item => item.userName === name)
    const renderedArr = tasks?.filter(item => Number(item.userId) === Number(currentUserId))
    const start = (task) => {
        if (Number(task.status) === 0) {
            axios.put(`${apiUrl}/tasks/${task.id}`, {
                deadLine: task.deadLine,
                description: task.description,
                id: task.id,
                status: 1,
                title: task.title,
                userId: task.userId
            }).then(res => toast.success("Successfully", toast_config))
        }
        else if (task.status == 1) {
            toast.error("You have started", toast_config)
        }
        else {
            toast.error("This task had been solved", toast_config)
        }

    }
    const finish = (task) => {
        if (Number(task.status) === 1) {
            axios.put(`${apiUrl}/tasks/${task.id}`, {
                deadLine: task.deadLine,
                description: task.description,
                id: task.id,
                status: 2,
                title: task.title,
                userId: task.userId,
                isFinished: true
            }).then(res => toast.success("Successfully", toast_config))
        }
        else if (Number(task.status === 2)) {
            toast.error("This task has been solved", toast_config)
        }
        else {
            toast.error("At first you must start", toast_config)
        }
    }


    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'red';
            case 1:
                return 'yellow';
            case 2:
                return 'green';
        }
    };


    return (
        <div className='userProfile'>
            {
                currentUser.id == 1 ?
                    "admin"
                    :
                    <div className="container">
                        <div className="header">
                            <h1>Welcome : {user?.name} ({user?.positionName})</h1>
                            <div className="navbar">
                                <ul>
                                    <li>
                                        <Link to={'/'}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/alltasks'}>
                                            All tasks
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/signin'}>
                                            Logout
                                        </Link>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content">
                            <div>
                                <h1 className='text-center'>My tasks</h1>
                                <Table className='my-5' hover>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Dead Line</th>
                                            <th>Status</th>
                                            <th>Resolve</th>
                                        </tr>
                                    </thead>
                                    {
                                        renderedArr.length > 0 ?
                                            <tbody>
                                                {
                                                    renderedArr.map((item, index) =>
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.description}</td>
                                                            <td>{item.deadLine}</td>
                                                            <td>  <FaCircle style={{ color: getStatusColor(item.status) }} /></td>
                                                            <td>
                                                                <Button
                                                                    color='primary'
                                                                    onClick={() => start(item)}
                                                                >
                                                                    Start
                                                                </Button>
                                                                <Button
                                                                    color='success'
                                                                    onClick={() => finish(item)}
                                                                >
                                                                    Finish
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                            :
                                            <div className='task'>
                                                <h2>You have not task</h2>
                                            </div>
                                    }
                                </Table>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default UserProfile