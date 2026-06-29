import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { Button } from 'reactstrap'
import { toast_config } from '../Utils/confiq'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { IoBriefcaseOutline, IoPersonOutline, IoCheckmarkSharp, IoCreateOutline } from 'react-icons/io5'
import { changePosition, fetchAllData, } from '../Slices/homeSlice'
import { FaSpinner } from 'react-icons/fa6'

function Valuation() {
  const { data, loading  } = useSelector(store => store.homeSlice)
  const { users, positions } = data
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const dispatch = useDispatch()

  const erasAble = users.filter(item => item.id !== "1")

  useEffect(() => {
    if (users.length || positions.length === 0) {
      dispatch(fetchAllData())
    }

  }, [dispatch]);

  const confirmPosition = async (item) => {
    if (!selectedPosition) {
      toast.error("Zəhmət olmasa düzgün vəzifə seçin", toast_config);
      return;
    }

    try {
      await dispatch(changePosition({
        userId: item.id,
        newPosition: selectedPosition,
        fullData: data
      })).unwrap();

      toast.success("Vəzifə uğurla yeniləndi!", toast_config);
      setSelectedItemId(null);
    } catch (error) {
      toast.error("Xəta baş verdi", toast_config);
    }
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

  if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="spinner-icon" size={60} />
            </div>
        );
    }

  return (
    <div className='valuation-layout'>
      <div className='valuation-container'>
        <div className='valuation-top-bar'>
          <div className='title-area'>
            <h1 className='page-title'>İdarəetmə <span>Mərkəzi</span></h1>
            <p className='page-subtitle'>Işçi statuslarını nəzərdən keçirin və iyerarxiyanı yeniləyin</p>
          </div>
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
                    Vəzifə: <strong>{!item.positionId || item.positionId === "0" ? "Unassigned" : item.positionName}</strong>
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
                        <IoCheckmarkSharp /> Təsdiqlə
                      </Button>
                      <Button
                        className='btn-cancel-link'
                        onClick={() => setSelectedItemId(null)}
                      >
                        Ləğv et
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
                      <IoCreateOutline />Dəyişdir
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