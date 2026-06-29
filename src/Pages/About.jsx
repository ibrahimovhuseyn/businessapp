import { Container, Row, Col } from 'reactstrap';
import { FiCpu, FiTerminal, FiShield, FiZap, FiUsers, FiAward, FiEye } from 'react-icons/fi';
import Header from '../Components/Header/Header';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <div className="about-cyber">
        <Container>

          {/* 1. Başlanğıc / Hero Bölməsi */}
          <div className="header-zone" data-aos="fade-down" data-aos-duration="1000">
            <h1 className="cyber-title">CORE<span className="text-neon">SYNC</span></h1>
            <p className="subtitle">Biznesinizin rəqəmsal təkamül mərkəzi.</p>
          </div>

          {/* 2. Əsas Xüsusiyyətlər Grid-i */}
          <Row className="info-grid">
            <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="100">
              <div className="cyber-node">
                <FiCpu className="icon" />
                <h4>Modern Texnoloji Stack</h4>
                <p>React və Node.js gücü ilə biznes ehtiyaclarınıza uyğun, yüksək performanslı rəqəmsal interfeyslər.</p>
              </div>
            </Col>
            <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="200">
              <div className="cyber-node">
                <FiTerminal className="icon" />
                <h4>Tapşırıq İdarəetməsi</h4>
                <p>Prosesləri real vaxt rejimində izləyin, idarə edin və daxili iş axınınızı tam şəffaflıqla miqyaslayın.</p>
              </div>
            </Col>
            <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="300">
              <div className="cyber-node">
                <FiShield className="icon" />
                <h4>Kriptoqrafik Müdafiə</h4>
                <p>Maliyyə və biznes kəşfiyyatı məlumatlarınız üçün hərbi səviyyəli təhlükəsizlik və məxfilik.</p>
              </div>
            </Col>
            <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="400">
              <div className="cyber-node">
                <FiZap className="icon" />
                <h4>Avtomatlaşdırılmış Axın</h4>
                <p>Mühasibatlıqdan insan resurslarına qədər — bütün manual maneələri ağıllı rəqəmsal sistemlərlə əvəz edin.</p>
              </div>
            </Col>
          </Row>

          {/* YENİ BÖLMƏ: Vizyon / Missiya */}
          <div className="mission-section" data-aos="zoom-in" data-aos-duration="800">
            <div className="mission-icon"><FiEye /></div>
            <h3>Gələcəyin İş Yerini Yaradırıq</h3>
            <p>Missiyamız mürəkkəb proqram təminatlarını hər kəs üçün əlçatan, başa düşülən və sürətli etməkdir. Komandanızın potensialını üzə çıxarın.</p>
          </div>

          {/* YENİ BÖLMƏ: Uğur Göstəriciləri (Statistika) */}
          <Row className="stats-section">
            <Col md={4} data-aos="flip-left" data-aos-delay="100">
              <div className="stat-box">
                <div className="stat-number">150+</div>
                <div className="stat-label">Uğurlu Layihə</div>
              </div>
            </Col>
            <Col md={4} data-aos="flip-left" data-aos-delay="200">
              <div className="stat-box">
                <div className="stat-number">10k+</div>
                <div className="stat-label">Aktiv Tapşırıq</div>
              </div>
            </Col>
            <Col md={4} data-aos="flip-left" data-aos-delay="300">
              <div className="stat-box">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Sistem İşləmə Əmsalı</div>
              </div>
            </Col>
          </Row>

          {/* YENİ BÖLMƏ: Komanda / Tərəfdaş Rəyləri */}
          <div className="testimonials-section" data-aos="fade-up">
            <h3 className="section-title">Niyə Bizə Güvənirlər?</h3>
            <Row>
              <Col md={6} data-aos="slide-right" data-aos-delay="200">
                <div className="testimonial-card">
                  <p>"CoreSync iş axınımızı tamamilə dəyişdi. İdarəetmə indi əvvəlkindən qat-qat şəffaf və sürətlidir."</p>
                  <div className="client">- Leyla Ə., Əməliyyat Direktoru</div>
                </div>
              </Col>
              <Col md={6} data-aos="slide-left" data-aos-delay="200">
                <div className="testimonial-card">
                  <p>"Hərbi səviyyəli təhlükəsizlik və sürət axtaranlar üçün mükəmməl platformadır. Məsləhət görürəm."</p>
                  <div className="client">- Orxan M., Baş Mühəndis</div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="footer-zone text-center" data-aos="zoom-in" data-aos-offset="50">
            <button className="cta-btn" onClick={() => {
navigate('/order')
            }}>Tərəfdaşlığı Başlat</button>
          </div>

        </Container>
      </div>
    </div>
  );
};

export default About;