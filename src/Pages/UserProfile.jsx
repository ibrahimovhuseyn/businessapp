import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  toast_config } from '../Utils/confiq';
import { FaPlay, FaCheck, FaCalendarAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import Header from '../Components/Header/Header';
import { fetchAllData } from '../Slices/homeSlice';

function UserProfile() {
    const { id } = useParams();
    const { data } = useSelector(store => store.homeSlice);
    const { currentUser, users, tasks } =data
    const dispatch = useDispatch();

    useEffect(() => {
        if (users.length || tasks.length === 0) {
            dispatch(fetchAllData())
        }
      
    }, [dispatch]);

    const user = users?.find(item => item.id === currentUser?.id);

    // 1. İstifadəçiyə aid taskları filtrləyirik
    const userTasks = tasks?.filter(item => item.userId === currentUser?.id) || [];

    // 2. Statusa görə sıralama: "not started" (1-ci) -> "in progress" (2-ci) -> "completed" (3-cü)
    const sortedTasks = [...userTasks].sort((a, b) => {
        const order = { "not started": 1, "in progress": 2, "completed": 3 };
        return (order[a.status] || 4) - (order[b.status] || 4);
    });

    // Statistika sayları
    const todoCount = userTasks.filter(item => item.status === "not started").length;
    const progressCount = userTasks.filter(item => item.status === "in progress").length;
    const doneCount = userTasks.filter(item => item.isFinished === true || item.status === "completed").length;

    const start = (task) => {
      
    };

    const finish = (task) => {
        
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case "not started":
                return <span className="status-badge todo"><FaExclamationCircle /> To Do</span>;
            case "in progress":
                return <span className="status-badge progress"><FaSpinner className="spin-icon" /> In Progress</span>;
            case "completed":
            default:
                return <span className="status-badge done"><FaCheckCircle /> Completed</span>;
        }
    };

    return (
        <div className='user-profile-layout'>
            <Header />

            <div className="container profile-wrapper">
                {/* Profil Məlumat və Yeni Kontrastlı Statistika Paneli */}
                <div className="profile-hero-section">
                    <div className="welcome-box">
                        <div className="user-avatar">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="user-text">
                            <h2>Welcome back, <span>{user?.name || currentUser?.userName}</span></h2>
                            <p className="role-tag">{user?.positionName || 'Developer'}</p>
                        </div>
                    </div>

                    <div className="mini-stats-grid">
                        <div className="stat-pill todo">
                            <span className="count">{todoCount}</span>
                            <span className="label">To Do</span>
                        </div>
                        <div className="stat-pill progress">
                            <span className="count">{progressCount}</span>
                            <span className="label">In Progress</span>
                        </div>
                        <div className="stat-pill done">
                            <span className="count">{doneCount}</span>
                            <span className="label">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Sıralanmış Müasir Task Grid Seksiyası */}
                <div className="tasks-board-section">
                    <h3 className="section-title">My Assigned Tasks ({sortedTasks.length})</h3>

                    {sortedTasks.length > 0 ? (
                        <div className="tasks-grid-container">
                            {sortedTasks.map((task) => (
                                <div key={task.id} className={`task-modern-card status-${task.status.replace(" ", "-")}`}>
                                    <div className="card-top">
                                        <span className="task-id">ID: #{task.id}</span>
                                        {renderStatusBadge(task.status)}
                                    </div>

                                    <div className="card-body-content">
                                        <h4 className="task-title">{task.title}</h4>
                                        <p className="task-desc">{task.description}</p>
                                    </div>

                                    <div className="card-footer-controls">
                                        <div className="deadline-box">
                                            <FaCalendarAlt className="cal-icon" />
                                            <span>Deadline: {task.deadLine}</span>
                                        </div>

                                        <div className="btn-group-actions">
                                            <button
                                                className="task-btn start"
                                                onClick={() => start(task)}
                                                disabled={task.status !== "not started"}
                                            >
                                                <FaPlay size={10} /> Start
                                            </button>
                                            <button
                                                className="task-btn finish"
                                                onClick={() => finish(task)}
                                                disabled={task.status !== "in progress"}
                                            >
                                                <FaCheck size={10} /> Finish
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-tasks-fallback">
                            <div className="fallback-illustration">🚀</div>
                            <h4>No tasks found for your account</h4>
                            <p>You don't have any pending operations inside the registry.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;