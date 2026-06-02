import { Container, Row, Col } from 'reactstrap';
import { FiCpu, FiTerminal, FiShield, FiZap } from 'react-icons/fi';
import Header from '../Components/Header/Header';

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-cyber">
        <Container>
          <div className="header-zone">
            <h1 className="cyber-title">CORE<span className="text-neon">SYNC</span></h1>
            <p className="subtitle">Biznesinizin rəqəmsal təkamül mərkəzi.</p>
          </div>

          <Row className="info-grid">
            <Col md={6} lg={3}>
              <div className="cyber-node">
                <FiCpu className="icon" />
                <h4>Modern Texnoloji Stack</h4>
                <p>React və Node.js gücü ilə biznes ehtiyaclarınıza uyğun, yüksək performanslı rəqəmsal interfeyslər.</p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="cyber-node">
                <FiTerminal className="icon" />
                <h4>Tapşırıq İdarəetməsi</h4>
                <p>Prosesləri real vaxt rejimində izləyin, idarə edin və daxili iş axınınızı tam şəffaflıqla miqyaslayın.</p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="cyber-node">
                <FiShield className="icon" />
                <h4>Kriptoqrafik Müdafiə</h4>
                <p>Maliyyə və biznes kəşfiyyatı məlumatlarınız üçün hərbi səviyyəli təhlükəsizlik və məxfilik.</p>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="cyber-node">
                <FiZap className="icon" />
                <h4>Avtomatlaşdırılmış Axın</h4>
                <p>Mühasibatlıqdan insan resurslarına qədər — bütün manual maneələri ağıllı rəqəmsal sistemlərlə əvəz edin.</p>
              </div>
            </Col>
          </Row>

          <div className="footer-zone text-center">
            <button className="cta-btn">Tərəfdaşlığı Başlat</button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default About;