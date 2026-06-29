import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoBriefcaseOutline, IoPersonOutline, IoTimeOutline, IoChevronForwardSharp } from 'react-icons/io5'
import { fetchAllData } from '../Slices/homeSlice'
import AdminHeader from '../Components/AdminHeader'

function AllTasks() {
  const { data } = useSelector(store => store.homeSlice)
  const { tasks, users } = data
  const dispatch = useDispatch()

  useEffect(() => {
    if (tasks.length || users.length === 0) {
      dispatch(fetchAllData())
    }

  }, [tasks.length])

  
  


  

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'status-finished';
      case 'in progress': return 'status-progress';
      default: return 'status-not-started';
    }
  }




  return (
    <div className='all-tasks-layout'>
      <div className='tasks-main-container'>
        <div className='tasks-header-bar'>
          <div>
            <h1 className='tasks-main-title'>Tapşırıq <span>Axını</span></h1>
            <p className='tasks-subtitle'>İşçi qüvvəsi üzrə bütün əməliyyat tapşırıqlarını izləyin, idarə edin və monitorinq edin.</p>
          </div>
          <div className='tasks-counter-badge'>
            Cəmi Tapşırıq: <strong>{tasks?.length || 0}</strong>
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
                          İşçi: <strong>{worker ? `${worker.name} ${worker.surname}` : 'Təyin olunmayıb'}</strong>
                        </span>

                        {item.deadLine && (
                          <span className='meta-item'>
                            <IoTimeOutline className='meta-icon' />
                            Son Tarix: <span className='date-highlight'>{item.deadLine}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sağ Tərəf: Status və Keçid İkonu */}
                  <div className='task-secondary-info'>
                    <span className={`status-badge ${getStatusClass(item.status)}`}>
                      {item.status || 'başlanmayıb'}
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
              <h3>Hələlik aktiv tapşırıq yoxdur</h3>
              <p>İşçilərinizə tapşırıq vermək üçün tapşırıq yaratma panelinə keçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllTasks