import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiUrl } from '../Utils/confiq'
import { useDispatch, useSelector } from 'react-redux'
import { getPosition } from '../Slices/adminSlice'
import { getUsers } from '../Slices/homeSlice'

function ServiceItem() {
    const { id } = useParams()
    const { positions } = useSelector(store => store.adminSlice)
    const { users } = useSelector(store => store.homeSlice)
    const dispatch = useDispatch()


    useEffect(() => {
        axios.get(`${apiUrl}/positions`).then(res => dispatch(getPosition(res.data)))
        axios.get(`${apiUrl}/users`).then(res => dispatch(getUsers(res.data)))
    }, [])

    console.log(id);

    const renderBody = (id) => {
        if (id == 1) {
            return (
                <img src={'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/Taksim-Square.jpg'} alt="" />
            )
        }
        else if (id == 2) {
            return (
                <img src={'https://th.bing.com/th/id/R.c94bf8b45fbfb69dd167da190aafbeb6?rik=1lkwwYqkadkLJA&pid=ImgRaw&r=0'} alt="" />
            )
        }
        else if (id == 3) {
            return (
                <img src={'https://assets.hongkiat.com/uploads/nature-photography/autumn-poolside.jpg'} alt="" />
            )
        }
        else if (id == 4) {
            return (
                <img src={'https://th.bing.com/th/id/R.f27058b299a669feec0ebc42a084776c?rik=pFd0j8PL8K3epA&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fWildlife-photographer.jpg&ehk=X5HngsCU0HONvjCHJjGs%2fl7FErLgzgwpqYbfXNAV8Mk%3d&risl=&pid=ImgRaw&r=0'} alt="" />
            )
        }
        else if (id == 5) {
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

    const currentPosition = positions.find(item => item.id == id)
    const photographer = users.find(item => item.positionId == id)

    console.log(photographer);
    return (
        <div className='serviceItem container'>
            <h1 className='text-center'>{currentPosition?.name}</h1>
            <div className="imgWrapper">
                {renderBody(id)}
            </div>
            <h3>Photographer : {photographer?.name}</h3>
        </div>
    )
}

export default ServiceItem