import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { apiUrl, toast_config } from '../Utils/confiq'
import { toast } from 'react-toastify'
import { fetchPositions } from '../Slices/homeSlice'
// Səndə mövqeləri idarə edən slice-dan müvafiq action-ı import et (məsələn: addPosition)
// Əgər belə bir action yoxdursa, homeSlice və ya adminSlice-da yarada bilərsən.

function CreatePosition() {
    const [positionName, setPositionName] = useState('')
    const [loading, setLoading] = useState(false)
    const { positions } = useSelector(store => store.homeSlice) // Və ya adminSlice, mövqelərin harda saxlanıldığına görə
    // Mövqeləri store-dan çəkmək üçün selector
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (positions.lenth === 0) {
            dispatch(fetchPositions())
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!positionName.trim()) {
            alert('Please enter a position name!')
            return
        }

        setLoading(true)

        const newPosition = {
            // json-server id-ni avtomatik string olaraq "7", "8" kimi generasiya edəcək
            name: positionName.trim()
        }

        axios.post(`${apiUrl}/positions`, newPosition)
            .then(res => {
                toast.success('Position successfully created!', toast_config)
                axios.get(`${apiUrl}/positions`).then(response => {
                    dispatch(getPosition(response.data))
                    setPositionName('')
                    navigate('/') // Və ya istədiyin başqa admin səhifəsinə yönləndir
                })
            })
            .catch(err => {
                console.error(err)
                alert('Something went wrong!')
            })
            .finally(() => {
                setLoading(false)
                navigate('/')
            })
    }

    return (
        <div className='create-position-layout'>
            <div className='form-main-containerContainer'>
                <div className='form-wrapper-box'>
                    <div className='form-header-zone'>
                        <h2 className='form-main-title'>Create New <span>Position</span></h2>
                        <p className='form-subtitle'>Add a new operational segment or technical role to the organization matrix</p>
                    </div>

                    <Form onSubmit={handleSubmit} className="neon-cyber-form">
                        <FormGroup>
                            <Label for="positionField" className="cyber-label">
                                Position / Role Name
                            </Label>
                            <Input
                                id="positionField"
                                name="position"
                                placeholder="e.g., Cyber Security Specialist"
                                type="text"
                                className="cyber-input"
                                value={positionName}
                                onChange={(e) => setPositionName(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </FormGroup>

                        <div className='btn-action-group'>
                            <Button
                                type="button"
                                className='cyber-btn-secondary'
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className='cyber-btn-primary'
                                disabled={loading}
                            >
                                {loading ? 'Deploying...' : 'Deploy Position'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CreatePosition