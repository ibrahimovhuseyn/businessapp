import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import Header from '../Components/Header/Header';

// Developer kartlarında istifadə etmək üçün ikonlar
import { FiMail, FiPhone, FiCpu, FiCode, FiTerminal, FiSmartphone, FiCheckSquare, FiPieChart, FiUser } from 'react-icons/fi';

// assets folderindən şəkillərin import olunması
import huseynImg from '../assets/Images/huseyn.jpg';
import aydanImg from '../assets/Images/aydan.jpg';
import elsadImg from '../assets/Images/elsad.avif';
import subhanImg from '../assets/Images/subhan.jpg';
import nihadImg from '../assets/Images/nihad.jpg';
import lemanImg from '../assets/Images/leman.jpg';
import { fetchAllData } from '../Slices/homeSlice';

function OurTeam() {
    const { data } = useSelector(store => store.homeSlice);
    const { users } = data;
    const dispatch = useDispatch();

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchAllData())
        }
    }, [users.length, dispatch]);

    // İstifadəçinin userName-inə uyğun şəkli tapan obyekt (Mapping)
    const imageMap = {
        huseyn: huseynImg,
        aydan: aydanImg,
        elsad: elsadImg,
        subhan: subhanImg,
        nihad: nihadImg,
        leman: lemanImg
    };

    // Sahələrə uyğun kiçik ikon render edən köməkçi funksiya
    const getPositionIcon = (positionId) => {
        switch (positionId?.toString()) {
            case "1": return <FiCode />;
            case "2": return <FiTerminal />;
            case "3": return <FiSmartphone />;
            case "4": return <FiCpu />;
            case "5": return <FiCheckSquare />;
            case "6": return <FiPieChart />;
            default: return <FiUser />;
        }
    };

    // Admin-i (id: "1" və ya userName: "admin") siyahıdan kənarlaşdırırıq
    const teamMembers = users?.filter(user => user.userName !== 'admin' && user.id !== '1');

    return (
        <div className='team-page-wrapper'>
            <Header />

          <div className='container my-5'>
    {/* Başlıq sahəsi */}
    <div className='team-header-section'>
        <h1 className='team-title'><span>Əsas</span> Komandamız</h1>
        <p className='team-subtitle'>
            CoreSync layihələrində innovasiyaları idarə edən mühəndislər, sistem memarları və analitiklərimizlə tanış olun.
        </p>
    </div>

    {/* Komanda Kartları Siyahısı */}
    <Row className='g-4'>
        {
            teamMembers?.map(member => (
                <div key={member.id} className="col-md-6 col-lg-4">
                    <div className={`team-card-item position-variant-${member.positionId}`}>

                        {/* Üst hissə: İkon və Vəzifə teqi */}
                        <div className="card-top-zone">
                            <div className="team-icon-box">
                                {getPositionIcon(member.positionId)}
                            </div>
                            <span className="position-tag">{member.positionName}</span>
                        </div>

                        {/* Şəkil Sahəsi */}
                        <div className="member-avatar-wrapper">
                            <div className="avatar-glow-effect"></div>
                            <img
                                src={imageMap[member.userName] || ""}
                                alt={`${member.name} ${member.surname}`}
                                className="member-avatar-img"
                            />
                        </div>

                        {/* Orta hissə: Ad və Soyad */}
                        <div className="card-middle-zone">
                            <h3 className="member-name">{member.name} {member.surname}</h3>
                            <span className="member-username">@{member.userName}</span>
                        </div>

                        {/* Alt hissə: Əlaqə məlumatları */}
                        <div className="card-bottom-zone">
                            <div className="contact-info-item">
                                <FiMail className="contact-icon" />
                                <span>{member.email}</span>
                            </div>
                            <div className="contact-info-item">
                                <FiPhone className="contact-icon" />
                                <span>{member.phone}</span>
                            </div>
                        </div>

                        {/* Profilə keçid düyməsi */}
                        <div className="card-action-zone">
                            <Link to={`/user/${member.id}`} className="view-profile-btn">
                                Performansı İzlə
                            </Link>
                        </div>

                    </div>
                </div>
            ))
        }
        {
            teamMembers?.length === 0 && (
                <div className="text-center w-100 my-5">
                    <p className="text-muted">Hələlik heç bir komanda üzvü aktiv deyil.</p>
                </div>
            )
        }
    </Row>
</div>
        </div>
    );
}

export default OurTeam;