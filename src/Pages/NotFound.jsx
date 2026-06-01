import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'

function NotFound() {
  const navigate = useNavigate()
  const { currentUser } = useSelector(store => store.homeSlice)
  const isAdmin = currentUser?.userName === "admin"

  // JavaScript obyektində CSS properties düzəldildi: lineHeight və 'line-height'
  const styles = {
    layout: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at top right, #0f172a, #070a13)',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      textAlign: 'center',
      padding: '20px',
    },
    content: {
      maxWidth: '500px',
    },
    errorCode: {
      fontSize: '130px',
      fontWeight: '900',
      margin: '0',
      lineHeight: '1', // line-height -> lineHeight olaraq düzəldildi
      background: 'linear-gradient(135deg, #ff0055, #00f3ff)',
      WebkitBackgroundClip: 'text', // 'text' kiçik hərflə yazıldı
      WebkitTextFillColor: 'transparent',
    },
    errorTitle: {
      fontSize: '28px',
      fontWeight: '800',
      marginTop: '15px',
      marginBottom: '15px',
      letterSpacing: '-0.5px',
    },
    spanNeon: {
      color: '#ff0055',
      textShadow: '0 0 15px rgba(255, 0, 85, 0.4)',
    },
    errorText: {
      color: '#94a3b8',
      fontSize: '14.5px',
      lineHeight: '1.6', // line-height -> lineHeight olaraq düzəldildi
      marginBottom: '35px',
    },
    btn: {
      background: 'linear-gradient(135deg, #0055ff, #00f3ff)',
      border: 'none',
      color: '#000000',
      fontWeight: '800',
      padding: '13px 32px',
      borderRadius: '10px',
      textTransform: 'uppercase',
      fontSize: '13px',
      letterSpacing: '0.5px',
      boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }
  }

  return (
    <div style={styles.layout}>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.errorTitle}>
          Page <span style={styles.spanNeon}>Not Found</span>
        </h2>
        <p style={styles.errorText}>
          The link you followed may be broken, or the page may have been removed. 
          Double-check the URL or return to safety below.
        </p>
        <Button 
          style={styles.btn}
          onClick={() => navigate('/')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.3)';
          }}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default NotFound