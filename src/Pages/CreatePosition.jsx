import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'
import { addPosition, fetchAllData } from '../Slices/homeSlice'
import { toast_config } from '../Utils/confiq'
import { FaSpinner } from 'react-icons/fa6'

function CreatePosition() {
    const { data, loading } = useSelector(store => store.homeSlice)
    const { positions } = data
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!positions || positions.length === 0) {
            dispatch(fetchAllData())
        }
    }, [dispatch, positions])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());

        const newPosition = {
            id: Date.now().toString(),
            name: formValues.position // Məsələn, 'Frontend Developer'
        };

        try {
            await dispatch(addPosition({ newPosition, fullData: data })).unwrap();
            toast.success("Yeni vəzifə uğurla əlavə edildi!", toast_config);
            navigate('/'); // İstədiyiniz səhifəyə yönləndirin
            e.target.reset(); // Formu təmizlə
        } catch (er) {
            toast.error("Vəzifə yaradılarkən xəta baş verdi.", toast_config);
            console.error(er);
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="spinner-icon" size={60} />
            </div>
        );
    }

    return (
        <div className='create-position-layout'>
            <div className='form-main-container'>
                <div className='form-wrapper-box'>
                    <div className='form-header-zone'>
                        <h2 className='form-main-title'>Yeni <span>Vəzifə</span> Yarat</h2>
                        <p className='form-subtitle'>Təşkilat matrisinə yeni bir əməliyyat seqmenti və ya texniki rol əlavə edin.</p>
                    </div>

                    <Form onSubmit={handleSubmit} className="neon-cyber-form">
                        <FormGroup>
                            <Label for="positionField" className="cyber-label">
                                Vəzifə / Rol Adı
                            </Label>
                            <Input
                                id="positionField"
                                name="position"
                                placeholder="məs., Kibertəhlükəsizlik üzrə Mütəxəssis"
                                type="text"
                                className="cyber-input"
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
                                Ləğv et
                            </Button>
                            <Button
                                type="submit"
                                className='cyber-btn-primary'
                                disabled={loading}
                            >
                                {loading ? 'Yaradılır...' : 'Vəzifəni Yarat'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CreatePosition