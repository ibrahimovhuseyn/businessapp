import React, { useEffect } from 'react'
import AdminHeader from '../Components/AdminHeader'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../Utils/confiq'
import { getTasks, getUsers } from '../Slices/homeSlice'


function AllTasks() {
  const { tasks, users } = useSelector(store => store.homeSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`${apiUrl}/tasks`).then(res => dispatch(getTasks(res.data)))
    axios.get(`${apiUrl}/users`).then(res => dispatch(getUsers(res.data)))
  }, [])

  return (
    <div className='allTasks'>
      <AdminHeader />
      <div className='mx-4'>
        {
          tasks.map((item, index) => (
            <Link key={item.id} to={`/task/${item.id}`}>
              <h1>
                {index + 1}.
                Worker: {
                  users.find((worker) => worker.id === Number(item.userId))?.name
                } {""} {users.find((worker) => worker.id === Number(item.userId))?.surname}
              </h1>

              <p>
                Title : {item.title}
              </p>
            </Link>
          ))
        }
      </div>

    </div>
  )
}

export default AllTasks