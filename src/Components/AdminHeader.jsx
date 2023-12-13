import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { TfiMenuAlt } from "react-icons/tfi";
import { IoLogOut } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function AdminHeader() {
    const logoUrl = 'https://i.etsystatic.com/8684670/r/il/15db07/3914380275/il_fullxfull.3914380275_gv6j.jpg'
    const navigate = useNavigate()
    const [isMenuVisible, setMenuVisibility] = useState(false);
    const toggleMenu = () => {
        setMenuVisibility(!isMenuVisible);
    };

    const logOut = () => {
        localStorage.setItem('isAuth', false)
        localStorage.setItem('currentUser', JSON.stringify({
            userName: "",
            phone: ""
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
                            <NavLink to={'/createuser'}>Create User</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/createtask'}>Create Task</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/alltasks'}>All Task</NavLink>
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