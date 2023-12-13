import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FaCircle } from "react-icons/fa";
import { apiUrl, toast_config } from '../Utils/confiq';
import axios from 'axios';
import { getTasks, getUsers } from '../Slices/homeSlice';
import { FaCheckDouble } from "react-icons/fa";
import { Button, Table } from 'reactstrap';
import { toast } from 'react-toastify';


function TaskWithId() {
    const { id } = useParams()
    const { tasks, users } = useSelector(store => store.homeSlice)
    const dispatch = useDispatch()


    useEffect(() => {
        axios.get(`${apiUrl}/users`).then(res => dispatch(getUsers(res.data)))
        axios.get(`${apiUrl}/tasks`).then(res => dispatch(getTasks(res.data)))
    }, [])

    const renderedTask = tasks?.find(item => item.id == id)

    let statusColor;
    switch (renderedTask?.status) {
        case 1:
            statusColor = 'yellow';
            break;
        case 2:
            statusColor = 'green';
            break;
        case 0:
            statusColor = 'red';
    }


    return (
        <div className='taskWithId container'>
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Dead Line</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{renderedTask?.title}</td>
                        <td>{renderedTask?.description}</td>
                        <td>{renderedTask?.deadLine}</td>
                        <td><FaCircle style={{ color: statusColor }} /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default TaskWithId