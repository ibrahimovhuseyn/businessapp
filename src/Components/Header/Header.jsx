import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { currentUser } = useSelector(store => store.homeSlice)
    const navigate = useNavigate()
    return (
        <div className='header'>
            <h1 className="coresync-logo" onClick={() => navigate('/')}>
                Core<span>Sync</span>
            </h1>
            <Navbar />
        </div>
    )
}

export default Header