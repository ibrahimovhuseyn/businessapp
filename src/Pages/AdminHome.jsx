import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { FiUsers, FiActivity, FiFolder, FiCpu, FiPlus, FiTrash2, FiPlay, FiPause, FiGrid } from 'react-icons/fi';
import AdminHeader from '../Components/AdminHeader';

// Sub-komponentlərin inteqrasiyası
import CreateUser from './CreateUser';
import Valuation from './Valuation';
import CreateTask from './CreateTask';
import CreatePosition from './CreatePosition';
import AllTasks from './AllTasks';
import { fetchAllData } from '../Slices/homeSlice';
import { FaSpinner } from 'react-icons/fa6';

function AdminHome() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { data, loading } = useSelector(store => store.homeSlice);
  const { users, tasks } = data;
  const dispatch = useDispatch();

  const [isLive, setIsLive] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState([
    "CoreSync İdarəetmə Mərkəzi uğurla işə salındı.",
    "AuthShield kriptoqrafik anbarı: QORUNUR",
  ]);

  // Canlı Terminal Loqları Efekti
  useEffect(() => {
    if (activeTab !== 'dashboard' || !isLive) return;

    if (users.length === 0 || tasks.length === 0) {
      dispatch(fetchAllData());
    }

    const logPool = [
      "Verilənlər bazası klaster sinxronizasiyası tamamlandı.",
      "Telemetriya impulsu aktiv qovşaqlara (nodes) göndərildi.",
      "Mikroxidmət yaddaş bölgüsü optimallaşdırıldı.",
      "Kriptoqrafik imza tokeni yeniləndi.",
      "FlowMatrix daxili tapşırığı uğurla yerinə yetirdi.",
      "SyncNode Engine kanalı təmizdir. Gecikmə aşkarlanmadı."
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString();
      setTerminalLogs(prev => [`[${timestamp}] ${randomLog}`, ...prev.slice(0, 5)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab, isLive, users, tasks, dispatch]);

  const clearLogs = () => setTerminalLogs(["Terminal loqları inzibatçı tərəfindən təmizləndi."]);
  const toggleLiveLogs = () => setIsLive(!isLive);

  // Komponentlərin steril şəkildə ekrana gətirilməsi
  const renderContent = () => {
    switch (activeTab) {
      case 'createuser': return <div className="modern-sub-card"><CreateUser /></div>;
      case 'valuation': return <div className="modern-sub-card"><Valuation /></div>;
      case 'createtask': return <div className="modern-sub-card"><CreateTask /></div>;
      case 'createposition': return <div className="modern-sub-card"><CreatePosition /></div>;
      case 'alltasks': return <div className="modern-sub-card"><AllTasks /></div>;
      case 'dashboard':
      default: return renderPremiumDashboard();
    }
  };

  const renderedTasks = tasks.filter(item => item.isFinished === false);
  const renderedUsers = users.filter(item => item.id != 1);

  // Yeni Müasir Dashboard Görünüşü
  const renderPremiumDashboard = () => {
    return (
      <Container fluid className="px-4">
        {/* METRİK KARTLARI */}
        <Row className="g-4 mb-4">
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper cyan"><FiUsers /></div>
              <div className="kpi-info">
                <span className="kpi-title">İstifadəçilər</span>
                <h3 className="kpi-value">{users?.length || 0}</h3>
              </div>
            </div>
          </Col>
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper purple"><FiFolder /></div>
              <div className="kpi-info">
                <span className="kpi-title">Aktiv Tapşırıqlar</span>
                <h3 className="kpi-value">{renderedTasks?.length || 0}</h3>
              </div>
            </div>
          </Col>
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper green"><FiActivity /></div>
              <div className="kpi-info">
                <span className="kpi-title">Sistem Vəziyyəti</span>
                <h3 className="kpi-value text-green">Stabil</h3>
              </div>
            </div>
          </Col>
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper orange"><FiCpu /></div>
              <div className="kpi-info">
                <span className="kpi-title">Sinxronizasiya</span>
                <h3 className="kpi-value">99.9%</h3>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          {/* USER GRID PANELI */}
          <Col lg={7} xl={8}>
            <div className="premium-main-card">
              <div className="card-header-modern">
                <div className="title-area">
                  <FiGrid className="me-2" />
                  <h4>İnfrastruktur Şəbəkəsi</h4>
                </div>
                <span className="status-badge">Canlı İzləmə</span>
              </div>
              <p className="card-subtitle-modern">
                Redux runtime arxitekturası daxilində sinxronizə olunan aktiv qovşaqların icmalı.
              </p>

              <div className="modern-user-grid">
                {renderedUsers?.map((user, idx) => {
                  const status = idx % 5 === 0 ? 'standby' : idx % 7 === 0 ? 'syncing' : 'active';
                  return (
                    <div key={user.id} className="modern-user-node">
                      <div className={`node-status-indicator ${status}`}></div>
                      <div className="node-avatar">
                        {user.name.charAt(0)}{user.surname.charAt(0)}
                      </div>
                      <div className="node-details">
                        <h5>{user.name} {user.surname}</h5>
                        <p>@{user.userName}</p>
                      </div>
                    </div>
                  );
                })}
                {users?.length === 0 && (
                  <div className="empty-grid-state">Aktiv istifadəçi qovşağı tapılmadı.</div>
                )}
              </div>
            </div>
          </Col>

          {/* STREAM LOGS PANELI */}
          <Col lg={5} xl={4}>
            <div className="premium-main-card terminal-container">
              <div className="card-header-modern justify-content-between">
                <div className="title-area">
                  <FiActivity className="me-2 text-purple" />
                  <h4>Sistem Telemetriyası</h4>
                </div>
                {isLive && <span className="live-pulse-badge">CANLI YAYIM</span>}
              </div>

              <div className="modern-terminal-box">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="modern-log-line">
                    <span className="log-prefix">&gt;</span> {log}
                  </div>
                ))}
              </div>

              <div className="modern-terminal-actions">
                <button
                  onClick={toggleLiveLogs}
                  className={`modern-btn-ctrl ${isLive ? 'btn-pause' : 'btn-play'}`}
                >
                  {isLive ? <FiPause /> : <FiPlay />}
                  <span>{isLive ? "Yayımı Dayandır" : "Yayımı Başlat"}</span>
                </button>
                <button onClick={clearLogs} className="modern-btn-ctrl btn-clear">
                  <FiTrash2 />
                  <span>Loqları Təmizlə</span>
                </button>
              </div>
            </div>

            {/* TEZKAR ƏMƏLİYYATLAR */}
            <div className="premium-main-card mt-4">
              <div className="card-header-modern">
                <h4>Tezkar Əməliyyatlar</h4>
              </div>
              <div className="modern-action-stack">
                <button className="modern-stack-trigger" onClick={() => setActiveTab('createuser')}>
                  <FiPlus /> <span>Yeni İstifadəçi Modulu</span>
                </button>
                <button className="modern-stack-trigger" onClick={() => setActiveTab('createtask')}>
                  <FiPlus /> <span>Tapşırıq Göndər</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };



  

  return (
    <div className="coresync-premium-dashboard-layout">
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="dashboard-viewport">
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminHome;