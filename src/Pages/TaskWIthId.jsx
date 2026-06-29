import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllData } from '../Slices/homeSlice';
import { FaSpinner, FaCalendarAlt, FaCheckCircle, FaUser, FaInfoCircle } from 'react-icons/fa';

function TaskWIthId() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector(store => store.homeSlice);
  const { tasks, users } = data;
  const navigate = useNavigate();
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchAllData());
    }
  }, [dispatch, tasks.length]);

  const currentTask = tasks.find(item => item.id === id);
  const assignedUser = users?.find(user => user.id === currentTask?.userId);

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner-icon" size={60} />
        <p>Sistem qovşaqları sinxronlaşdırılır...</p>
      </div>
    );
  }

  if (!currentTask) return <div className="error-msg">Tapşırıq tapılmadı.</div>;

  return (
    <div className="task-detail-layout">
      <div className="task-detail-card">
        <div className="card-header">
          <span className={`status-badge ${currentTask.status === "completed" ? "status-finished" :
            currentTask.status === "in progress" ? "status-progress" :
              "status-not-started"
            }`}>
            {currentTask.status === "in progress" ? "İcra olunur" :
              currentTask.status === "completed" ? "Tamamlanıb" :
                "Gözləmədə"}
          </span>
          <h1>{currentTask.title}</h1>
        </div>

        <div className="card-body">
          <div className="info-box">
            <FaInfoCircle />
            <p>{currentTask.description}</p>
          </div>

          <div className="meta-grid">
            <div className="meta-item">
              <label>İcraçı</label>
              <span>
                <FaUser /> {assignedUser ? `${assignedUser.name} ${assignedUser.surname}` : "Naməlum"}
              </span>
            </div>
            <div className="meta-item">
              <label>Son Tarix</label>
              <span><FaCalendarAlt /> {currentTask.deadLine}</span>
            </div>
            <div className="meta-item">
              <label>İcraçı ID</label>
              <span><FaUser /> {currentTask.userId}</span>
            </div>
          </div>
        </div>

        {currentTask.isFinished && (
          <div className="completion-tag">
            <FaCheckCircle /> Tamamlanıb
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskWIthId;