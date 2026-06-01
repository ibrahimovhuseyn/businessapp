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
                <h4>Huseyn Ibrahimov</h4>
              </div>
              <p className="about-text">
                I am a software developer specializing in building modern, fast, and 
                user-centric web applications. Harnessing the power of Redux, React, 
                Node.js, and Java, I architect digital ecosystems and deliver seamless frontend 
                and backend integrations. My core focus is always on clean code, ultimate 
                performance, and innovative solutions.
              </p>
            </div>
          </Col>

          {/* SECTION 2: EXPERTISE / SERVICES */}
          <Col lg={3} md={6} sm={12}>
            <div className="footer-links-segment">
              <h5 className="segment-title">Expertise</h5>
              <ul className="tech-stack-list">
                <li><FiArrowRight className="list-arrow" /> Frontend (React, Redux, Axios)</li>
                <li><FiArrowRight className="list-arrow" /> Backend (Node.js, REST APIs)</li>
                <li><FiArrowRight className="list-arrow" /> Core Programming (Java SE)</li>
                <li><FiArrowRight className="list-arrow" /> Architecture (Microservices, State Mgmt)</li>
              </ul>
            </div>
          </Col>

          {/* SECTION 3: DIRECT CONTACT GATES */}
          <Col lg={4} md={6} sm={12}>
            <div className="footer-contact-segment">
              <h5 className="segment-title">Quick Contact</h5>
              <p className="contact-desc">Direct lines are open for project proposals, inquiries, or collaborations:</p>
              
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
                    <span>WhatsApp Live</span>
                    <strong>+994 70 305 60 68</strong>
                  </div>
                </a>

                {/* BİRBAŞA GMAİL AÇAN YENİ KOD */}
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ibrahimovh066@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="user-contact-card gmail-gate"
                >
                  <div className="icon-box"><FiMail /></div>
                  <div className="card-info">
                    <span>Email Address</span>
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
                © {currentYear} Huseyn Ibrahimov. All rights reserved.
              </span>
            </Col>
            <Col sm={6} className="text-center text-sm-end mt-3 mt-sm-0">
              <div className="framework-badge">
                <FiLayers className="me-1" /> Built with Premium Stack
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </footer>
  );
}

export default UserFooter;