import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignIn from './Pages/SignIn'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/Style/index.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from './Pages/AdminHome'
import CreateUser from './Pages/CreateUser'
import CreateTask from './Pages/CreateTask'
import AllTasks from './Pages/AllTasks'
import TaskWithId from './Pages/TaskWithId'
import Home from './Pages/Home'
import UserProfile from './Pages/UserProfile'



function App() {
  const { currentUser } = useSelector(store => store.signInSlice)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/createuser' element={<CreateUser />} />
        <Route path='/createtask' element={<CreateTask />} />
        <Route path='/alltasks' element={<AllTasks />} />
        <Route path='/task/:id' element={<TaskWithId />} />
        <Route path='/user/:id' element={<UserProfile />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App