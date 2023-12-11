import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TfiMenuAlt } from "react-icons/tfi";
import { IoLogOut } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function AdminHeader() {
    const logoUrl = 'https://www.barnburnerbbq.ca/wp-content/uploads/2019/04/NEW-Canex-Logo-jpg.jpg'
    const navigate = useNavigate()
    const [isMenuVisible, setMenuVisibility] = useState(false);
    const toggleMenu = () => {
        setMenuVisibility(!isMenuVisible);
    };

    const logOut = () => {
        localStorage.setItem('isAuth', false)
        localStorage.setItem('currentUser', JSON.stringify({
            userName: "",
            password: ""
        }))
        navigate('/signin')
    }

  




    return (
        <div>
            <div className='adminHeader'>
                <div className="logo">
                    <Link to={'/adminhome'}>
                        <img src={logoUrl} alt="logo" />
                    </Link>
                </div>
                <div className="navbar">
                    <ul>
                        <li>
                            <Link to={'/createuser'}>Create User</Link>
                        </li>
                        <li>
                            <Link to={'/createtask'}>Create Task</Link>
                        </li>
                        <li>
                            <Link to={'/alltasks'}>All Task</Link>
                        </li>
                        <button
                            className='btn'
                            onClick={() => {
                                logOut()
                            }}
                        >
                            Logout
                        </button>
                    </ul>
                </div>
                <div className="menu">
                    <button
                        className='btn'
                        onClick={toggleMenu}
                    >
                        <TfiMenuAlt className='i' />
                    </button>
                    <button
                        className='btn'
                        onClick={() => logOut()}
                    >
                        <IoLogOut className='i' />
                    </button>
                </div>

            </div>
            <div>
                {isMenuVisible && (
                    <div className='none'>
                        <button
                            className='btn'
                            onClick={() => {
                                setMenuVisibility(!isMenuVisible);
                            }}
                        >
                            <IoClose />
                        </button>
                        <ul>
                            <li>
                                <Link to={'/createuser'}>Create User</Link>
                            </li>
                            <li>
                                <Link to={'/createtask'}>Create Task</Link>
                            </li>
                            <li>
                                <Link to={'/alltasks'}>All Tasks</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminHeader