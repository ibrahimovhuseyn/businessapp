import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { TfiMenuAlt } from "react-icons/tfi";
import { IoLogOut } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

function AdminHeader() {
    const navigate = useNavigate()
    const [isMenuVisible, setMenuVisibility] = useState(false);
    const { currentUser } = useSelector(store => store.homeSlice)

    const logoUrl = "https://i.etsystatic.com/9264928/r/il/e11757/5235339445/il_570xN.5235339445_lf8x.jpg"


    const toggleMenu = () => {
        setMenuVisibility(!isMenuVisible);
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

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
                        {
                            currentUser.userName === 'admin' ?
                                <li>
                                    <div className="d-flex">
                                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                                            <DropdownToggle caret>User Managment</DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>
                                                    <Link to={'/createuser'}>Create User</Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to={'/valuation'}>Valuation User</Link>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </li>
                                :
                                <li>
                                    <NavLink to={'/'}>Home</NavLink>
                                </li>
                        }
                        {
                            currentUser.userName === 'admin' ?
                                <li>
                                    <NavLink to={'/createtask'}>Create Task</NavLink>
                                </li>
                                :
                                <li>
                                    <NavLink to={`/user/${currentUser.id}`}>Profile</NavLink>
                                </li>
                        }

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
                                <Link to={'/valuation'}>Valuation User</Link>
                            </li>
                            <li>
                                <Link to={'/createtask'}>Create Task</Link>
                            </li>
                            <li>
                            <Link to={'/deletetask'}>Delete Task</Link>

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