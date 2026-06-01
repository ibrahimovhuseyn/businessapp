import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import axios from 'axios' // Sizin konfiqurasiyaya uyğun olaraq (və ya 'axios')
import axiosOriginal from 'axios'
import { Button } from 'reactstrap'
import { apiUrl, toast_config } from '../Utils/confiq'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { IoBriefcaseOutline, IoPersonOutline, IoCheckmarkSharp, IoCreateOutline } from 'react-icons/io5'
import { fetchPositions, fetchUsers } from '../Slices/homeSlice'

function Valuation() {
  const { users, currentUser, positions } = useSelector(store => store.homeSlice)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const dispatch = useDispatch()

  const erasAble = users.filter(item => item.id !== currentUser?.id)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
    if (positions.length === 0) {
      dispatch(fetchPositions())
    }
  }, [dispatch]);

  const confirmPosition = (item) => {
    if (!selectedPosition) {
      toast.error("Please select a valid position", toast_config)
      return
    }

    axiosOriginal.put(`${apiUrl}/users/${item.id}`, {
      ...item,
      positionId: selectedPosition.id,
      positionName: selectedPosition.name,
    }).then(() => {
      toast.success("Position successfully updated", toast_config)
      setSelectedItemId(null) 
      setSelectedPosition(null)
      // Əvvəlki köhnə metodun yerinə yeni yazdığımız fərdi AsyncThunk-ı çağırırıq!
      dispatch(fetchUsers())
    })
  }

  // React-select üçün kiber qaranlıq dizayn obyektləri
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: '#0d1321',
      borderColor: state.isFocused ? '#00f3ff' : 'rgba(255, 255, 255, 0.1)',
      boxShadow: state.isFocused ? '0 0 10px rgba(0, 243, 255, 0.2)' : 'none',
      '&:hover': { borderColor: '#00f3ff' },
      borderRadius: '8px',
      minWidth: '220px',
    }),
    menu: (base) => ({
      ...base,
      background: '#0f1424',
      border: '1px solid rgba(0, 243, 255, 0.2)',
      borderRadius: '8px',
      zIndex: 9999, // Menyunun öz daxili z-index-ni çox böyük edirik
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Body səviyyəsində render üçün z-index
    option: (base, state) => ({
      ...base,
      background: state.isSelected ? '#00f3ff' : state.isFocused ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
      color: state.isSelected ? '#000' : '#e0e0e6',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({ ...base, color: '#ffffff' }),
    placeholder: (base) => ({ ...base, color: '#64748b', fontSize: '14px' })
  };

  return (
    <div className='valuation-layout'>

      <div className='valuation-container'>
        <div className='valuation-top-bar'>
          <div className='title-area'>
            <h1 className='page-title'>Management <span>Center</span></h1>
            <p className='page-subtitle'>Review personnel status and update hierarchy placements</p>
          </div>
          <Link className='back-home-link' to={'/'}>
            ← Back Home
          </Link>
        </div>

        <div className='workers-grid-container'>
          {erasAble.map(item => (
            <div className={`worker-card ${selectedItemId === item.id ? 'active-editing' : ''}`} key={item.id}>

              <div className='worker-info-section'>
                <div className='avatar-icon-box'>
                  <IoPersonOutline />
                </div>
                <div className='details'>
                  <h3 className='worker-name'>{item.name} {item.surname}</h3>
                  <p className='username-tag'>@{item.userName}</p>
                </div>
              </div>

              <div className='position-status-section'>
                <div className='current-position-badge'>
                  <IoBriefcaseOutline className='badge-icon' />
                  <span>
                    Role: <strong>{!item.positionId || item.positionId === "0" ? "Unassigned" : item.positionName}</strong>
                  </span>
                </div>

                <div className='action-control-area'>
                  {selectedItemId === item.id ? (
                    <div className='edit-mode-controls'>
                      <Select
                        isClearable
                        styles={customSelectStyles}
                        options={positions}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        onChange={e => setSelectedPosition(e)}
                        placeholder="Choose new role..."
                        // Bu iki xüsusiyyət açılan menyunu sənədlərin (DOM) ən üst qatına (body-yə) bağlayır
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                      />
                      <Button
                        className='btn-confirm-neon'
                        onClick={() => confirmPosition(item)}
                      >
                        <IoCheckmarkSharp /> Confirm
                      </Button>
                      <Button
                        className='btn-cancel-link'
                        onClick={() => setSelectedItemId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className='btn-change-neon'
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setSelectedPosition(null);
                      }}
                    >
                      <IoCreateOutline /> Change Role
                    </Button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Valuation