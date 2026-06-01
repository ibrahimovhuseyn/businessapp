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
import { fetchTasks, fetchUsers } from '../Slices/homeSlice';

function AdminHome() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { users, tasks } = useSelector(store => store.homeSlice);
  const dispatch = useDispatch()







  const [isLive, setIsLive] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState([
    "CoreSync Control Center successfully initialized.",
    "AuthShield cryptographic vault: SECURE",
  ]);

  // Canlı Terminal Loqları Efekti
  useEffect(() => {
    if (activeTab !== 'dashboard' || !isLive) return;

    if (users.length === 0) {
      dispatch(fetchUsers())
    }

    else if (tasks.length === 0) {
      dispatch(fetchTasks())
    }
    const logPool = [
      "Database cluster synchronization complete.",
      "Telemetry pulse sent to global active nodes.",
      "Microservice memory reallocation optimized.",
      "Cryptographic signature token refreshed.",
      "FlowMatrix successfully dispatched internal stack task.",
      "SyncNode Engine pipeline clear. Zero latency detected."
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString();
      setTerminalLogs(prev => [`[${timestamp}] ${randomLog}`, ...prev.slice(0, 5)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab, isLive]);

  const clearLogs = () => setTerminalLogs(["Terminal log history cleared by administrator."]);
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

  const renderedTasks = tasks.filter(item => item.isFinished === false)
  const renderedUsers = users.filter(item => item.id != 1)


  // Yeni Müasir Dashboard Görünüşü
  const renderPremiumDashboard = () => {
    return (
      <Container fluid className="px-4">
        {/* METRİK KARTLARI (KPI CARDS) */}
        <Row className="g-4 mb-4">
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper cyan">
                <FiUsers />
              </div>
              <div className="kpi-info">
                <span className="kpi-title">Total Users</span>
                <h3 className="kpi-value">{users?.length || 0}</h3>
              </div>
            </div>
          </Col>
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper purple">
                <FiFolder />
              </div>
              <div className="kpi-info">
                <span className="kpi-title">Active Tasks</span>
                <h3 className="kpi-value">{renderedTasks?.length || 0}</h3>
              </div>
            </div>
          </Col>
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper green">
                <FiActivity />
              </div>
              <div className="kpi-info">
                <span className="kpi-title">System Status</span>
                <h3 className="kpi-value text-green">Healthy</h3>
              </div>
            </div>
          </Col>
          <Col sm={6} xl={3}>
            <div className="premium-kpi-card">
              <div className="kpi-icon-wrapper orange">
                <FiCpu />
              </div>
              <div className="kpi-info">
                <span className="kpi-title">Sync Rate</span>
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
                  <h4>Infrastructure Grid Matrix</h4>
                </div>
                <span className="status-badge">Live System Tracking</span>
              </div>
              <p className="card-subtitle-modern">
                Overview of active nodes globally synchronized within the Redux runtime architecture.
              </p>

              <div className="modern-user-grid">
                {renderedUsers?.map((user, idx) => {
                  // Dinamik və estetik status nöqtələri
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
                  <div className="empty-grid-state">
                    No active user nodes found in the current cluster database.
                  </div>
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
                  <h4>System Telemetry</h4>
                </div>
                {isLive && <span className="live-pulse-badge">LIVE STREAM</span>}
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
                  <span>{isLive ? "Pause Stream" : "Resume Stream"}</span>
                </button>
                <button onClick={clearLogs} className="modern-btn-ctrl btn-clear">
                  <FiTrash2 />
                  <span>Wipe Logs</span>
                </button>
              </div>
            </div>

            {/* TEZBAZAR KONTROL DÜYMƏLƏRİ */}
            <div className="premium-main-card mt-4">
              <div className="card-header-modern">
                <h4>Quick Operations</h4>
              </div>
              <div className="modern-action-stack">
                <button className="modern-stack-trigger" onClick={() => setActiveTab('createuser')}>
                  <FiPlus /> <span>Deploy New User Module</span>
                </button>
                <button className="modern-stack-trigger" onClick={() => setActiveTab('createtask')}>
                  <FiPlus /> <span>Dispatch Pipeline Task</span>
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