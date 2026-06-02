import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FiMail, FiLayers, FiCode, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

function UserFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-user-footer">
      <Container>
        <Row className="gy-5 py-5">
          
          {/* SECTION 1: ABOUT ME */}
          <Col lg={5} md={12}>
            <div className="footer-about-segment">
              <div className="footer-brand">
                <FiCode className="brand-icon" />
                <h4>Hüseyn İbrahimov</h4>
              </div>
              <p className="about-text">
                Biznesiniz üçün yüksək sürətli, istifadəçi mərkəzli və modern veb tətbiqlər arxitekturası qururam. 
                React, Node.js və Java gücünü birləşdirərək, rəqəmsal ekosistemlərinizi miqyaslanır və avtomatlaşdırıram. 
                Əsas hədəfim: təmiz kod, mükəmməl performans və biznesinizə dəyər qatan yenilikçi həllərdir.
              </p>
            </div>
          </Col>

          {/* SECTION 2: EXPERTISE / SERVICES */}
          <Col lg={3} md={6} sm={12}>
            <div className="footer-links-segment">
              <h5 className="segment-title">Texnoloji Yığım</h5>
              <ul className="tech-stack-list">
                <li><FiArrowRight className="list-arrow" /> Frontend (React, Redux, Axios)</li>
                <li><FiArrowRight className="list-arrow" /> Backend (Node.js, REST API)</li>
                <li><FiArrowRight className="list-arrow" /> Core Development (Java SE)</li>
                <li><FiArrowRight className="list-arrow" /> Arxitektura (Microservices, State)</li>
              </ul>
            </div>
          </Col>

          {/* SECTION 3: DIRECT CONTACT GATES */}
          <Col lg={4} md={6} sm={12}>
            <div className="footer-contact-segment">
              <h5 className="segment-title">Birbaşa Əlaqə</h5>
              <p className="contact-desc">Layihə təklifləri və əməkdaşlıq üçün birbaşa xətlərimiz aktivdir:</p>
              
              <div className="user-contact-cards">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/994703056068" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="user-contact-card whatsapp-gate"
                >
                  <div className="icon-box"><FaWhatsapp /></div>
                  <div className="card-info">
                    <span>WhatsApp Canlı</span>
                    <strong>+994 70 305 60 68</strong>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ibrahimovh066@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="user-contact-card gmail-gate"
                >
                  <div className="icon-box"><FiMail /></div>
                  <div className="card-info">
                    <span>E-poçt Ünvanı</span>
                    <strong>ibrahimovh066@gmail.com</strong>
                  </div>
                </a>
              </div>
            </div>
          </Col>

        </Row>

        {/* BOTTOM METRICS & COPYRIGHT */}
        <div className="footer-bottom-bar">
          <Row className="align-items-center py-4">
            <Col sm={6} className="text-center text-sm-start">
              <span className="copyright-text">
                © {currentYear} Hüseyn İbrahimov. Bütün hüquqlar qorunur.
              </span>
            </Col>
            <Col sm={6} className="text-center text-sm-end mt-3 mt-sm-0">
              <div className="framework-badge">
                <FiLayers className="me-1" /> CoreSync Mühəndisliyi ilə hazırlanıb
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </footer>
  );
}

export default UserFooter;