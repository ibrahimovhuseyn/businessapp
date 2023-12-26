import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import Header from '../Components/Header/Header';
import axios from 'axios';
import { apiUrl } from '../Utils/confiq';
import { getUsers } from '../Slices/homeSlice';
import { getPosition } from '../Slices/adminSlice';

function Services() {
    const { users } = useSelector(store => store.homeSlice)
    const { positions } = useSelector(store => store.adminSlice)
    const dispatch = useDispatch()

    const renderBody = (service) => {
        if (service.id === 1) {
            return (
                <img src={'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/Taksim-Square.jpg'} alt="" />
            )
        }
        else if (service.id === 2) {
            return (
                <img src={'https://th.bing.com/th/id/R.c94bf8b45fbfb69dd167da190aafbeb6?rik=1lkwwYqkadkLJA&pid=ImgRaw&r=0'} alt="" />
            )
        }
        else if (service.id === 3) {
            return (
                <img src={'https://assets.hongkiat.com/uploads/nature-photography/autumn-poolside.jpg'} alt="" />
            )
        }
        else if (service.id === 4) {
            return (
                <img src={'https://th.bing.com/th/id/R.f27058b299a669feec0ebc42a084776c?rik=pFd0j8PL8K3epA&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fWildlife-photographer.jpg&ehk=X5HngsCU0HONvjCHJjGs%2fl7FErLgzgwpqYbfXNAV8Mk%3d&risl=&pid=ImgRaw&r=0'} alt="" />
            )
        }
        else if (service.id === 5) {
            return (
                <img src={'https://newstric.com/wp-content/uploads/2021/05/travel-photography-780x470.png'} alt="" />
            )
        }
        else {
            return (
                <img src={'https://www.cined.com/content/uploads/2016/08/film-lighting_featured.jpg'} alt="" />
            )
        }
    }
    useEffect(() => {
        axios.get(`${apiUrl}/users`).then(res => dispatch(getUsers(res.data)))
        axios.get(`${apiUrl}/positions`).then(res => dispatch(getPosition(res.data)))
    }, [])

    return (
        <div className='services container'>

            <Header />
            <h1 className='text-center'>Our Services</h1>
            <Row>
                {
                    positions?.map(item => (
                        <div className="col-md-6 col-lg-4 item">
                            <Link
                                to={`/service/${item.id}`}
                            >
                                <h3 className='text-center'>{item.name}</h3>
                                <div className="imgWrapper">
                                    {
                                        renderBody(item)
                                    }
                                    <p>
                                        {
                                            users?.filter(user => user.positionId == item.id)
                                                .map(filtered => (
                                                    <Link
                                                    >
                                                        Photogapher:  {filtered.name}   {filtered.surname}
                                                    </Link>
                                                ))
                                        }
                                    </p>
                                </div></Link>
                        </div>
                    ))
                }
            </Row>
        </div>
    )
}

export default Services