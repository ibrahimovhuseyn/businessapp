import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { toast_config } from '../Utils/confiq';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaUserLarge, FaPhone } from "react-icons/fa6";
import { fetchAllData } from '../Slices/homeSlice';

function ResetPassword() {
    const dispatch = useDispatch();
    const { data } = useSelector(store => store.homeSlice);
    const { users } = data;

    const [password, setPassword] = useState(null);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchAllData());
        }
    }, [dispatch, users.length]);

    const handlePassword = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const passwordData = users.find(item => 
            item.userName === data.userName && item.phone === data.phone
        );

        if (passwordData) {
            setPassword(passwordData.password);
            e.target.reset();
        } else {
            toast.error("İstifadəçi tapılmadı!", toast_config);
            setPassword(null);
        }
    };

    return (
        <div className='resetPassword'>
            <Form onSubmit={handlePassword}>
                <div className='page'>
                    <h2>Şifrə Bərpası</h2>

                    <div className="userName">
                        <Input
                            placeholder='İstifadəçi adınızı daxil edin'
                            name='userName'
                            type='text'
                            required
                            onChange={() => setPassword(null)}
                        />
                        <div className='i'>
                            <FaUserLarge className='is' />
                        </div>
                    </div>

                    <div className="phone">
                        <Input
                            placeholder='Telefon nömrənizi daxil edin'
                            name='phone'
                            type='text'
                            required
                            onChange={() => setPassword(null)}
                        />
                        <div className='i'>
                            <FaPhone className='is' />
                        </div>
                    </div>

                    <Button type='submit'>
                        Hesabı Axtar
                    </Button>

                    {password && (
                        <div className="password-result animate-fade-in">
                            <p>Sizin şifrəniz:</p>
                            <span className="retrieved-pass">{password}</span>
                        </div>
                    )}

                    <div className='list'>
                        <ul>
                            <li>
                                <Link to={'/signin'}>Giriş səhifəsinə qayıt</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Ana səhifə</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default ResetPassword;