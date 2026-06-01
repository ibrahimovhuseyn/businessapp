import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoBriefcaseOutline, IoPersonOutline, IoTimeOutline, IoChevronForwardSharp } from 'react-icons/io5'
import { fetchTasks, fetchUsers } from '../Slices/homeSlice'

function AllTasks() {
  const { tasks, users } = useSelector(store => store.homeSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks())
    }
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
  }, [dispatch])

  // Statuslara görə dinamik CSS klassları təyin edən funksiya
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'finished': return 'status-finished';
      case 'in progress': return 'status-progress';
      default: return 'status-not-started';
    }
  }

  return (
    <div className='all-tasks-layout'>
      <div className='tasks-main-container'>
        <div className='tasks-header-bar'>
          <div>
            <h1 className='tasks-main-title'>Task <span>Pipeline</span></h1>
            <p className='tasks-subtitle'>Monitor, track, and manage all operational duties across the workforce</p>
          </div>
          <div className='tasks-counter-badge'>
            Total Tasks: <strong>{tasks?.length || 0}</strong>
          </div>
        </div>

        <div className='tasks-grid-list'>
          {tasks && tasks.map((item, index) => {
            const worker = users.find((u) => u.id === item.userId);

            return (
              <Link key={item.id} to={`/task/${item.id}`} className='task-link-card'>
                <div className='task-card-body'>

                  {/* Sol Tərəf: İndeks və Tapşırıq Məlumatları */}
                  <div className='task-primary-info'>
                    <div className='task-index-box'>
                      #{String(index + 1).padStart(2, '0')}
                    </div>

                    <div className='task-details'>
                      <h3 className='task-card-title'>{item.title}</h3>

                      <div className='task-meta-row'>
                        <span className='meta-item'>
                          <IoPersonOutline className='meta-icon' />
                          Worker: <strong>{worker ? `${worker.name} ${worker.surname}` : 'Not Assigned'}</strong>
                        </span>

                        {item.deadLine && (
                          <span className='meta-item'>
                            <IoTimeOutline className='meta-icon' />
                            Deadline: <span className='date-highlight'>{item.deadLine}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sağ Tərəf: Status və Keçid İkonu */}
                  <div className='task-secondary-info'>
                    <span className={`status-badge ${getStatusClass(item.status)}`}>
                      {item.status || 'not started'}
                    </span>
                    <div className='arrow-action-box'>
                      <IoChevronForwardSharp />
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}

          {(!tasks || tasks.length === 0) && (
            <div className='no-tasks-fallback'>
              <IoBriefcaseOutline className='fallback-icon' />
              <h3>No tasks deployed yet</h3>
              <p>Go to the task creation panel to distribute work to your employees.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllTasks