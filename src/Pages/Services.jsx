import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import Header from '../Components/Header/Header';
import axios from 'axios';

import {
    FiGlobe, FiSmartphone, FiFileText, FiTrendingUp, FiLayers,
    FiZap, FiPieChart, FiCpu
} from 'react-icons/fi';
import { fetchServices } from '../Slices/homeSlice';

function Services() {
    const { users, services } = useSelector(store => store.homeSlice);
    const dispatch = useDispatch()


    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServices())
        }
    }, [])


    const iconMap = {
        "web-apps": <FiGlobe />,
        "mobile-apps": <FiSmartphone />,
        "excel-automation": <FiFileText />,
        "accounting-systems": <FiTrendingUp />,
        "cloud-infrastructure": <FiCpu />,
        "product-strategy": <FiLayers />
    };

    return (
        <div className='services-page-wrapper'>
            <Header />

            <div className='container my-5'>
                {/* Biznes Üstünlüyü Başlığı */}
                <div className='services-header-section'>
                    <div className='cyber-badge'>
                        <FiZap className='pulse-icon' /> <span>TASKHUB SOLUTIONS & SERVICES</span>
                    </div>
                    <h1 className='services-title'>What We <span>Deliver</span></h1>
                    <p className='services-subtitle'>
                        Stop chasing engineering stacks. We deliver battle-tested enterprise solutions engineered to scale, digitize, and automate your entire business ecosystem seamlessly.
                    </p>
                </div>

                {/* Xidmət/Departament Kartları */}
                <Row className='g-4'>
                    {
                        services?.map(service => (
                            <div key={service.id} className="col-md-6 col-lg-4">
                                <div className={`service-biz-card variant-${service.class}`}>

                                    {/* Üst Kiber Etiket və Dinamik İkon */}
                                    <div className="card-header-zone">
                                        <span className="biz-tag">{service.tag}</span>
                                        <div className="biz-icon-box">
                                            {iconMap[service.id] || <FiLayers />}
                                        </div>
                                    </div>

                                    {/* Əsas Kontent */}
                                    <Link to={`/service/${service.id}`} className="card-body-zone">
                                        <h3 className='biz-title'>{service.title}</h3>
                                        <p className='biz-tech-focus'><strong>Scope:</strong> {service.focus}</p>
                                    </Link>

                                    {/* Real-time Biznes Metriki */}
                                    <div className="biz-metric-panel">
                                        <div className="metric-info">
                                            <span className="metric-label">{service.metricLabel}</span>
                                            <span className="metric-value">{service.metricValue}</span>
                                        </div>
                                        <div className="metric-progress-bar">
                                            <div className="progress-fill"></div>
                                        </div>
                                    </div>

                                    {/* Alt Panel: Sadələşdirilmiş Action Link */}
                                    <div className="card-footer-zone justify-content-end">
                                        <Link to={`/service/${service.id}`} className="biz-action-link">
                                            Request Həll
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </Row>
            </div>
        </div>
    );
}

export default Services;