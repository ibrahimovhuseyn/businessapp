import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Valuation from './Pages/Valuation'
import ResetPassword from './Pages/ResetPassword'
import Services from './Pages/Services'
import ServiceItem from './Pages/ServiceItem'
import NotFound from './Pages/NotFound'
import CreatePosition from './Pages/CreatePosition'
import OurTeam from './Pages/OurTeam'
import OrderApp from './Pages/OrderApp'
import UserFooter from './Components/Footer'

function App() {
  const { currentUser } = useSelector(store => store.homeSlice)
  const isAdmin = currentUser?.userName === "admin"

  return (
    <div>
      <Routes>
        {/* HƏR İKİ ROL ÜÇÜN ORTAK OLAN MARŞRUTLAR */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/alltasks' element={<AllTasks />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/task/:id' element={<TaskWithId />} />
        <Route path='/service/:id' element={<ServiceItem />} />
        <Route path='/services' element={<Services />} />
        <Route path='/our-team' element={<OurTeam />} />
        <Route path='/order' element={<OrderApp />} />

        {/* ROLA GÖRƏ DƏYİŞƏN KÖK ( / ) VƏ SPESİFİK MARŞRUTLAR */}
        {isAdmin ? (
          // Sırf Admin üçün keçərli olan Route-lar
          <>
            <Route path='/' element={<AdminHome />} />
            <Route path='/createuser' element={<CreateUser />} />
            <Route path='/createposition' element={<CreatePosition />} />
            <Route path='/valuation' element={<Valuation />} />
            <Route path='/createtask' element={<CreateTask />} />
          </>
        ) : (
          // Sırf Normal İstifadəçi üçün keçərli olan Route-lar
          <>
            <Route path='/' element={<Home />} />
            <Route path='/user/:id' element={<UserProfile />} />
          </>
        )}

        {/* TAPILMAYAN SƏHİFƏLƏR ÜÇÜN YÖNLƏNDİRMƏ */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <UserFooter/>

      <ToastContainer />
    </div>
  )
}

export default App