import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TfiMenuAlt } from "react-icons/tfi";
import { IoLogOut, IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { setCurrentUser } from '../Slices/homeSlice';

function AdminHeader({ activeTab, setActiveTab }) {
    const navigate = useNavigate();
    const [isMenuVisible, setMenuVisibility] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setMenuVisibility(!isMenuVisible);
    };

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const logOut = () => {
        localStorage.removeItem('currentUser');
        navigate('/signin');
        dispatch(setCurrentUser(null));
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setMenuVisibility(false); 
    };

    // YENİ: Ekran böyüdükdə mobil menyunu avtomatik bağlayan nəzarətçi
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setMenuVisibility(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <header className='header'>
                <h1 className="coresync-logo" onClick={() => handleTabChange('dashboard')}>
                    Core<span>Sync</span>
                </h1>

                <nav className="taskhub-nav">
                    <ul className="nav-links">
                        <li>
                            <div className="d-flex">
                                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret className={`nav-item dropdown-toggle-custom ${['createuser', 'valuation'].includes(activeTab) ? 'active' : ''}`}>
                                        User Management
                                    </DropdownToggle>
                                    <DropdownMenu className="custom-dropdown-menu">
                                        <DropdownItem onClick={() => handleTabChange('createuser')}>
                                            Create User
                                        </DropdownItem>
                                        <DropdownItem onClick={() => handleTabChange('valuation')}>
                                            Valuation User
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </li>

                        <li>
                            <button 
                                className={`nav-item-btn ${activeTab === 'createtask' ? 'active' : ''}`} 
                                onClick={() => handleTabChange('createtask')}
                            >
                                Create Task
                            </button>
                        </li>

                        <li>
                            <button 
                                className={`nav-item-btn ${activeTab === 'createposition' ? 'active' : ''}`} 
                                onClick={() => handleTabChange('createposition')}
                            >
                                Create Position
                            </button>
                        </li>

                        <li>
                            <button 
                                className={`nav-item-btn ${activeTab === 'alltasks' ? 'active' : ''}`} 
                                onClick={() => handleTabChange('alltasks')}
                            >
                                All Tasks
                            </button>
                        </li>
                    </ul>

                    <div className="nav-auth">
                        <button className='nav-btn logout-btn' onClick={logOut}>
                            <IoLogOut className="nav-icon" /> Logout
                        </button>
                    </div>
                </nav>

                {/* Mobil Düymələr */}
                <div className="menu">
                    <button className='btn' onClick={toggleMenu}>
                        <TfiMenuAlt className='i' />
                    </button>
                    <button className='btn text-danger' onClick={logOut}>
                        <IoLogOut className='i' />
                    </button>
                </div>
            </header>

            {/* YENİLƏNMİŞ: Sağdan sürüşərək açılan kiber panel */}
            <div className={`mobile-sidebar-drawer ${isMenuVisible ? 'drawer-open' : ''}`}>
                <div className='drawer-content'>
                    <div className="drawer-header">
                        <span className="drawer-title">CORE_NAVIGATION</span>
                        <button className='btn close-btn' onClick={toggleMenu}>
                            <IoClose />
                        </button>
                    </div>
                    
                    <ul className="drawer-links">
                        <li>
                            <button className={activeTab === 'createuser' ? 'active' : ''} onClick={() => handleTabChange('createuser')}>Create User</button>
                        </li>
                        <li>
                            <button className={activeTab === 'valuation' ? 'active' : ''} onClick={() => handleTabChange('valuation')}>Valuation User</button>
                        </li>
                        <li>
                            <button className={activeTab === 'createtask' ? 'active' : ''} onClick={() => handleTabChange('createtask')}>Create Task</button>
                        </li>
                        <li>
                            <button className={activeTab === 'createposition' ? 'active' : ''} onClick={() => handleTabChange('createposition')}>Create Position</button>
                        </li>
                        <li>
                            <button className={activeTab === 'alltasks' ? 'active' : ''} onClick={() => handleTabChange('alltasks')}>All Tasks</button>
                        </li>
                    </ul>

                    <div className="drawer-footer">
                        <button className="drawer-logout" onClick={logOut}>
                            <IoLogOut /> SYSTEM DISCONNECT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;