import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FaCircle } from "react-icons/fa";

function TaskWithId() {
    const { id } = useParams()
    const { tasks, users } = useSelector(store => store.signInSlice)

    const renderedTask = tasks.find(item => item.id == id)
    const taskOwner = users.find(item => item.id == renderedTask.userId)

    
    let statusColor;
    switch (renderedTask.status) {
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
        <div className='taskWithId'>
            <div>
                <h3>Worker : {taskOwner.name} {taskOwner.surname}</h3>
                <p>Title : {renderedTask.title}</p>
                <p>Description : {renderedTask.description}</p>
                <p>Dead-Line : {renderedTask.deadLine}(yy//mm/dd)</p>
                <p className='d-flex align-items-center'>
                    Status :
                    <FaCircle style={{ color: statusColor }} />
                </p>
            </div>
        </div>
    )
}

export default TaskWithId