import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import axios from 'axios'
import { Button } from 'reactstrap'
import { apiUrl, toast_config } from '../Utils/confiq'
import { getPosition } from '../Slices/adminSlice'
import { toast } from 'react-toastify'
import { getUsers } from '../Slices/homeSlice'
import AdminHeader from '../Components/AdminHeader'
import { Link } from 'react-router-dom'



function Valuation() {

  const { users, currentUser } = useSelector(store => store.homeSlice)
  const { positions } = useSelector(store => store.adminSlice)
  const [showPosition, setShowPosition] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState({})
  const [selectedItemId, setSelectedItemId] = useState("hh");
  console.log(selectedPosition);

  const disptach = useDispatch()


  const erasAble = users.filter(item => item.id !== currentUser.id)



  useEffect(() => {
    axios.get(`${apiUrl}/positions`).then(res => disptach(getPosition(res.data)))
    axios.get(`${apiUrl}/users`).then(res => disptach(getUsers(res.data)))
  }, [])



  const confirmPosition = (e) => {


    axios.put(`${apiUrl}/users/${e.id}`, {
      name: e.name,
      surname: e.surname,
      userName: e.userName,
      id: e.id,
      email: e.email,
      phone: e.phone,
      positionId: selectedPosition.id,
      positionName: selectedPosition.name
    }).then(res => toast.success("Successfully", toast_config))
  }

  return (
    <div className='valuation'>
      <AdminHeader />
      <h1 className='text-center'>All positions and workers</h1>
      <Link
        className='mx-5'
        style={{
          "fontSize": "2.6rem",
          "color": "#000",
        }}
        to={'/'}
      >
        Home
      </Link>

      <div className='about container'>
        {
          erasAble.map(item => (
            <div className='item' key={item.id}>
              <p>Worker: {item.name}     {item.surname}</p>
              <div className="d-flex">
                <p>Position : {item.positionId == 0 ? "none " : item.positionName}</p>
                {!selectedItemId && (
                  <Button
                    onClick={() => {
                      setSelectedItemId(item.id);
                      setSelectedPosition({}); // Reset selected position when clicking the Change button
                    }}
                    size="sm"
                  >
                    Change
                  </Button>
                )}
                {
                  selectedItemId == item.id ?
                    <div className='d-flex'>
                      <Select
                        isClearable
                        options={positions}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        onChange={e => setSelectedPosition(e)}
                      />
                      <Button
                        onClick={() => {
                          setShowPosition(false)
                          confirmPosition(item)
                          setSelectedItemId(item.name)
                        }}
                      >
                        Confirm
                      </Button>
                    </div>
                    :
                    <Button
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setSelectedPosition({}); // Reset selected position when clicking the Change button
                      }}
                      size="sm"
                    >
                      Change
                    </Button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Valuation