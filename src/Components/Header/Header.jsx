import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const { isAuth, currentUser } = useSelector(store => store.homeSlice)
    const imgUrl = 'https://i.etsystatic.com/8684670/r/il/15db07/3914380275/il_fullxfull.3914380275_gv6j.jpg'

    const name = currentUser?.userName

    return (
        <div className='header'>
            <Link to={'/'}>
                <div className="logo">
                    <img src={imgUrl} alt="logo" />
                </div></Link>
            <div className="signin">
                {
                    currentUser &&
                        name.length > 0 ?
                        <div className='d-flex'>
                            <button onClick={()=>navigate(`/user/${currentUser?.id}`)}>Profile</button>
                            <button onClick={() => navigate('/signin')}>Logout</button>
                        </div>
                        :
                        <button onClick={() => navigate('/signin')}>Login</button>
                }
            </div>
        </div>
    )
}

export default Header