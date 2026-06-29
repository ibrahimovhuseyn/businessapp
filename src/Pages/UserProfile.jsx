import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaPlay, FaCheck, FaCalendarAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Header from '../Components/Header/Header';
import { fetchAllData, updateTaskStatus } from '../Slices/homeSlice';

function UserProfile() {
    const { id } = useParams();
    const { data, currentUser, loading } = useSelector(store => store.homeSlice);
    const { users, tasks } = data;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!users.length || !tasks.length) {
            dispatch(fetchAllData());
        }
    }, [dispatch, users.length, tasks.length]);

    const user = users?.find(item => item.id === currentUser?.id);
    const userTasks = tasks?.filter(item => item.userId === currentUser?.id) || [];

    // Status sıralaması
    const sortedTasks = [...userTasks].sort((a, b) => {
        const order = { "not started": 1, "in progress": 2, "completed": 3 };
        return (order[a.status] || 4) - (order[b.status] || 4);
    });

    const todoCount = userTasks.filter(item => item.status === "not started").length;
    const progressCount = userTasks.filter(item => item.status === "in progress").length;
    const doneCount = userTasks.filter(item => item.status === "completed").length;

    const start = (task) => {
        dispatch(updateTaskStatus({
            taskId: task.id,
            status: "in progress",
            isFinished: false,
            fullData: data
        }))
    };

    const finish = (task) => {
        dispatch(updateTaskStatus({
            taskId: task.id,
            status: "completed",
            isFinished: true,
            fullData: data
        }));
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case "not started":
                return <span className="status-badge todo"><FaExclamationCircle /> Gözləmədə</span>;
            case "in progress":
                return <span className="status-badge progress"><FaSpinner className="spin-icon" /> İcrada</span>;
            case "completed":
                return <span className="status-badge done"><FaCheckCircle /> Tamamlanıb</span>;
            default:
                return null;
        }
    };

    return (
        <div className='user-profile-layout'>
            <Header />

            <div className="container profile-wrapper">
                {loading ? (
                    <div className="loading-container">
                        <FaSpinner className="spinner-icon pulse" size={60} />
                        <p>Sistem qovşaqları sinxronlaşdırılır...</p>
                    </div>
                ) : (
                    <>
                        <div className="profile-hero-section">
                            <div className="welcome-box">
                                <div className="user-avatar">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="user-text">
                                    <h2>Xoş gəldin, <span>{user?.name || currentUser?.userName}</span></h2>
                                    <p className="role-tag">{user?.positionName || 'İstifadəçi'}</p>
                                </div>
                            </div>

                            <div className="mini-stats-grid">
                                <div className="stat-pill todo">
                                    <span className="count">{todoCount}</span>
                                    <span className="label">Gözləmədə</span>
                                </div>
                                <div className="stat-pill progress">
                                    <span className="count">{progressCount}</span>
                                    <span className="label">İcrada</span>
                                </div>
                                <div className="stat-pill done">
                                    <span className="count">{doneCount}</span>
                                    <span className="label">Tamamlanıb</span>
                                </div>
                            </div>
                        </div>

                        <div className="tasks-board-section">
                            <h3 className="section-title">Tapşırıqlarım ({sortedTasks.length})</h3>

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
                                                    <span>Son tarix: {task.deadLine}</span>
                                                </div>

                                                <div className="btn-group-actions">
                                                    <button
                                                        className="task-btn start"
                                                        onClick={() => start(task)}
                                                        disabled={task.status !== "not started"}
                                                    >
                                                        <FaPlay size={10} /> Başla
                                                    </button>
                                                    <button
                                                        className="task-btn finish"
                                                        onClick={() => finish(task)}
                                                        disabled={task.status !== "in progress"}
                                                    >
                                                        <FaCheck size={10} /> Bitir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-tasks-fallback">
                                    <div className="fallback-illustration">🚀</div>
                                    <h4>Tapşırıq tapılmadı</h4>
                                    <p>Hal-hazırda sistemdə sizə təyin olunmuş tapşırıq yoxdur.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfile;