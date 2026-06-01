import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiLayers, FiBriefcase, FiUsers, FiUser, FiLogOut, FiLogIn, FiMenu, FiX } from 'react-icons/fi';
import { setCurrentUser } from '../../Slices/homeSlice';
import { toast } from 'react-toastify';
import { toast_config } from '../../Utils/confiq';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.homeSlice);
  const hasPosition = currentUser?.positionName;

  const handleLogout = () => {
    localStorage.setItem("currentUser", null);
    dispatch(setCurrentUser(null));
    toast.success("Logged out successfully!", toast_config);
    setIsMobileOpen(false);
    navigate('/signin');
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  // 1. MƏNTİQ: Mobil menyu açıq olanda arxa fonun scroll olmasını əngəlləyir
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileOpen]);

  // 2. MƏNTİQ (YENİ): Ekran ölçüsü 1024px-i keçəndə mobil menyunu avtomatik bağlayır
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="taskhub-nav desktop-only">
        <div className="nav-desktop-container">
          <div className="nav-links">
            <NavLink to="/services" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FiLayers className="nav-icon" />
              <span>Services</span>
            </NavLink>

            <NavLink to="/order" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FiBriefcase className="nav-icon" />
              <span>Order</span>
            </NavLink>

            <NavLink to="/our-team" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FiUsers className="nav-icon" />
              <span>Our Team</span>
            </NavLink>
          </div>

          <div className="nav-auth">
            {hasPosition ? (
              <>
                <NavLink
                  to={`/user/${currentUser.id}`}
                  className={({ isActive }) => isActive ? "nav-item active profile-link" : "nav-item profile-link"}
                >
                  <FiUser className="nav-icon" />
                  <span>Profile</span>
                </NavLink>

                <button onClick={handleLogout} className="nav-btn logout-btn">
                  <FiLogOut className="nav-icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/signin" className={({ isActive }) => isActive ? "nav-item active login-btn" : "nav-item login-btn"}>
                <FiLogIn className="nav-icon" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE TRIGGER BUTTON (Hamburger / Bağlama Düyməsi) */}
      <button 
        className={`mobile-menu-trigger ${isMobileOpen ? 'trigger-active' : ''}`} 
        onClick={toggleMobileMenu} 
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* YENİLƏNMİŞ: Kiber Şüşə Effektli Mobil Yan Panel (Side Drawer) */}
      <div className={`nav-mobile-overlay ${isMobileOpen ? 'active' : ''}`} onClick={closeMobileMenu}>
        <div className="nav-mobile-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <span className="drawer-logo">Core<span>Sync</span></span>
            <span className="drawer-terminal-text">SYS_NAV_v1.0</span>
          </div>

          <div className="mobile-links-wrapper">
            <NavLink to="/services" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
              <FiLayers className="nav-icon" />
              <span>Services</span>
            </NavLink>

            <NavLink to="/order" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
              <FiBriefcase className="nav-icon" />
              <span>Order</span>
            </NavLink>

            <NavLink to="/our-team" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-item active" : "mobile-nav-item"}>
              <FiUsers className="nav-icon" />
              <span>Our Team</span>
            </NavLink>

            <div className="mobile-auth-divider"></div>

            {hasPosition ? (
              <>
                <NavLink
                  to={`/user/${currentUser.id}`}
                  onClick={closeMobileMenu}
                  className={({ isActive }) => isActive ? "mobile-nav-item active profile-link" : "mobile-nav-item profile-link"}
                >
                  <FiUser className="nav-icon" />
                  <span>Profile</span>
                </NavLink>

                <button onClick={handleLogout} className="mobile-nav-item mobile-logout-btn">
                  <FiLogOut className="nav-icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/signin" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-item active mobile-login-btn" : "mobile-nav-item mobile-login-btn"}>
                <FiLogIn className="nav-icon" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;