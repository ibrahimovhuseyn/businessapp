import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { fetchServices, fetchUsers, fetchTasks } from '../Slices/homeSlice';
import Header from '../Components/Header/Header';

// İkonlar
import { 
  FiArrowRight, FiCpu, FiLayers, FiDatabase, FiShield, 
  FiGitPullRequest, FiTerminal, FiTrendingUp, FiActivity 
} from 'react-icons/fi';

// AOS Animasiya Kitabxanası
import AOS from 'aos';
import 'aos/dist/aos.css';

// 3-cü Section-dakı kiber üstünlüklər üçün ikon xəritəsi
const coreFeatures = [
  { id: 1, title: "Zero Downtime", desc: "Automated CI/CD hybrid microservices.", icon: <FiShield /> },
  { id: 2, title: "Predictive Analytics", desc: "AI-driven database scalability matrix.", icon: <FiTrendingUp /> },
  { id: 3, title: "Neural Synchronization", desc: "Real-time global state architecture.", icon: <FiGitPullRequest /> },
  { id: 4, title: "Cyber-Safe Infrastructure", desc: "End-to-end telemetry encryption.", icon: <FiTerminal /> }
];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, services, tasks } = useSelector(store => store.homeSlice);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    if (users.length === 0) dispatch(fetchUsers());
    if (services.length === 0) dispatch(fetchServices());
    if (tasks.length === 0) dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className='coresync-homepage home'>
      <Header />

      {/* ================= SECTION 1: HERO & CORE SERVICES (6 CARDS MAX) ================= */}
      <section className='section-hero-services' id='hero'>
        <Container>
          <div className='hero-intro-zone text-center' data-aos="fade-down">
            <span className='cyber-badge'>CORE_SYNC // SYSTEM OPERATIONAL</span>
            <h1 className='main-glow-title'>Next-Gen Enterprise <span>Ecosystem</span></h1>
            <p className='hero-subtitle-text'>
              We architect production-ready cyber solutions engineered to scale, digitize, and automate your enterprise workflow with absolute precision.
            </p>
          </div>

          {/* 4-6 ədəd Xidmət (Solutions) Kartları */}
          <Row className='g-4 mt-5'>
            {services?.slice(0, 6).map((service, index) => (
              <Col md={6} lg={4} key={service.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={`solution-cyber-card variant-${service.class}`}>
                  <div className='card-glow-overlay'></div>
                  <span className='card-number'>0{index + 1}</span>
                  <span className='card-tag'>{service.tag}</span>
                  <h3 className='card-title'>{service.title}</h3>
                  <p className='card-desc'>{service.focus}</p>
                  <div className='card-metric-badge'>
                    {service.metricLabel}: <strong>{service.metricValue}</strong>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= SECTION 2: CORE ECOSYSTEM PRODUCTS (REPLACES SQUAD) ================= */}
      <section className='section-elite-squad' id='team'>
        <Container>
          <div className='section-header text-center' data-aos="zoom-in">
            <h2 className='section-title'>Core <span>Ecosystem</span> Modules</h2>
            <p className='section-desc'>
              Discover our proprietary high-performance microservices engineered for seamless enterprise automation.
            </p>
          </div>

          <Row className='g-4 mt-4 justify-content-center'>
            
            {/* Module 1: SyncNode */}
            <Col sm={6} lg={3} data-aos="flip-left" data-aos-delay="0">
              <div className='squad-member-card'>
                <div className='avatar-wrapper-circle'>
                  <img src="https://api.dicebear.com/7.x/identicon/svg?seed=syncnode" alt="SyncNode" className='round-avatar' />
                  <div className='pulse-border-line'></div>
                </div>
                <h4 className='member-name'>SyncNode Engine</h4>
                <span className='member-role'>Distributed Gateway</span>
                <p className='member-handle'>v2.4.0-stable</p>
              </div>
            </Col>

            {/* Module 2: DataMesh */}
            <Col sm={6} lg={3} data-aos="flip-left" data-aos-delay="150">
              <div className='squad-member-card'>
                <div className='avatar-wrapper-circle'>
                  <img src="https://api.dicebear.com/7.x/identicon/svg?seed=datamesh" alt="DataMesh" className='round-avatar' />
                  <div className='pulse-border-line'></div>
                </div>
                <h4 className='member-name'>DataMesh Pipeline</h4>
                <span className='member-role'>Telemetry Storage</span>
                <p className='member-handle'>v1.9.5-beta</p>
              </div>
            </Col>

            {/* Module 3: CyberGuard */}
            <Col sm={6} lg={3} data-aos="flip-left" data-aos-delay="300">
              <div className='squad-member-card'>
                <div className='avatar-wrapper-circle'>
                  <img src="https://api.dicebear.com/7.x/identicon/svg?seed=cyberguard" alt="CyberGuard" className='round-avatar' />
                  <div className='pulse-border-line'></div>
                </div>
                <h4 className='member-name'>AuthShield Core</h4>
                <span className='member-role'>Cryptographic Vault</span>
                <p className='member-handle'>v4.1.2-enterprise</p>
              </div>
            </Col>

            {/* Module 4: FlowMatrix */}
            <Col sm={6} lg={3} data-aos="flip-left" data-aos-delay="450">
              <div className='squad-member-card'>
                <div className='avatar-wrapper-circle'>
                  <img src="https://api.dicebear.com/7.x/identicon/svg?seed=flowmatrix" alt="FlowMatrix" className='round-avatar' />
                  <div className='pulse-border-line'></div>
                </div>
                <h4 className='member-name'>FlowMatrix Ops</h4>
                <span className='member-role'>Task Orchestrator</span>
                <p className='member-handle'>v3.0.0-rc1</p>
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ================= SECTION 3: TECH ARCHITECTURE (4 CARDS WITH ICONS) ================= */}
      <section className='section-tech-capabilities' id='capabilities'>
        <Container>
          <div className='section-header' data-aos="fade-right">
            <h2 className='section-title'>System <span>Capabilities</span></h2>
            <p className='section-desc'>Maximum runtime optimization combined with a bulletproof cyber-defense infrastructure.</p>
          </div>

          <Row className='g-4 mt-3'>
            {coreFeatures.map((feat, index) => (
              <Col md={6} lg={3} key={feat.id} data-aos="fade-up" data-aos-delay={index * 200}>
                <div className='capability-icon-card'>
                  <div className='icon-hexagon-box'>
                    {feat.icon}
                  </div>
                  <h4 className='cap-title'>{feat.title}</h4>
                  <p className='cap-desc'>{feat.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= SECTION 4: REAL-TIME CONSOLE PORTAL (LAUNCH CONSOLE) ================= */}
      <section className='section-console-portal' data-aos="zoom-in-up">
        <Container>
          <div className='console-glass-portal'>
            <div className='grid-bg-effect'></div>
            <Row className='align-items-center position-relative'>
              <Col lg={8}>
                <div className='portal-content'>
                  <div className='live-signal'><span className='dot'></span> LIVE METRIC MONITOR</div>
                  <h2 className='portal-main-title'>Internal Management Console</h2>
                  <p className='portal-text'>
                    Access the CoreSync Control Center to adjust global node structures, optimize user roles, track active cryptographic tasks, and monitor system parameters in real-time.
                  </p>
                </div>
              </Col>
              <Col lg={4} className='text-lg-end'>
                <Button className='btn-launch-neon' onClick={() => navigate('/valuation')}>
                  Launch Console <FiArrowRight />
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* ================= SECTION 5: LIVE INFRASTRUCTURE METRICS (DYNAMIC STATS) ================= */}
      <section className='section-live-telemetry'>
        <Container>
          <Row className='g-4 align-items-center'>
            <Col lg={4} data-aos="fade-right">
              <h3 className='telemetry-title'>CoreSync Live <span>Telemetry</span></h3>
              <p className='telemetry-subtitle'>Reactive state metrics streaming directly from your active database ecosystem nodes.</p>
            </Col>
            <Col lg={8}>
              <Row className='g-4'>
                <Col xs={6} md={4} data-aos="fade-down" data-aos-delay="100">
                  <div className='telemetry-stat-box'>
                    <FiLayers className='stat-ico cyan' />
                    <h2 className='stat-num'>{services.length}</h2>
                    <p className='stat-label'>Deployed Solutions</p>
                  </div>
                </Col>
                <Col xs={6} md={4} data-aos="fade-down" data-aos-delay="200">
                  <div className='telemetry-stat-box'>
                    <FiCpu className='stat-ico purple' />
                    <h2 className='stat-num'>{users.length}</h2>
                    <p className='stat-label'>Synchronized Nodes</p>
                  </div>
                </Col>
                <Col xs={12} md={4} data-aos="fade-down" data-aos-delay="300">
                  <div className='telemetry-stat-box'>
                    <FiActivity className='stat-ico green' />
                    <h2 className='stat-num'>{tasks.length + 24}+</h2>
                    <p className='stat-label'>Automated Tasks/Sec</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;