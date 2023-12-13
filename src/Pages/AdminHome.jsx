import React from 'react'
import AdminHeader from '../Components/AdminHeader'
import { useSelector } from 'react-redux'

function AdminHome() {
  const { currentUser } = useSelector(store => store.homeSlice)
  return (
    <div className='admin'>
      <AdminHeader />
    </div>
  )
}

export default AdminHome