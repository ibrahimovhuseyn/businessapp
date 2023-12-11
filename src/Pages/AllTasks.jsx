import React from 'react'
import AdminHeader from '../Components/AdminHeader'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function AllTasks() {
  const { tasks, users } = useSelector(store => store.signInSlice)




  return (
    <div className='allTasks'>
      <AdminHeader />
      <div className='mx-4'>
        {
          tasks.map(item => (
            <Link
              key={item.id}
              to={`/task/${item.id}`}
              className='link'
            >
              <h1>
                {item.id}.
                Worker : {users.find((worker) => worker.id === Number(item.userId))?.name
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