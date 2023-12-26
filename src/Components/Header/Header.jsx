import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const { currentUser } = useSelector(store => store.homeSlice)
    const imgUrl = "https://i.etsystatic.com/9264928/r/il/e11757/5235339445/il_570xN.5235339445_lf8x.jpg"
    const name = currentUser?.userName

    const realNav = (user) => {
        console.log(user);
        if (user.id == 1) {
            navigate('/adminhome')
        }
        else {
            navigate(`/user/${user.id}`)
        }
    }
    return (
        <div className='header'>
            <Link to={'/'}>
                <div className="logo">
                    <img src={imgUrl} alt="logo" />
                </div></Link>
            <div className="signin d-flex">
                <div className='navBar'>
                    <ul>
                        <li>
                            <button onClick={()=>navigate('/services')}>Services</button>
                        </li>
                        <li>
                            <button>Order </button>
                        </li>
                    </ul>
                </div>
                {
                    currentUser &&
                        name.length > 0 ?
                        <div className='d-flex'>
                            <button onClick={() => realNav(currentUser)}>Profile</button>
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