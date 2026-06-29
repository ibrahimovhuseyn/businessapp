import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from '../Components/Header/Header';
import { toast_config } from '../Utils/confiq';
import { FiSend, FiFileText, FiUser, FiMail, FiLayers, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa6';
import { addOrder } from '../Slices/homeSlice';

function OrderApp() {
  // Giriş etmiş istifadəçinin məlumatlarını çəkirik (opsional olaraq formu doldurmaq üçün)
  const { currentUser, loading,data } = useSelector((store) => store.homeSlice);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Formun state strukturu
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '1', // Default olaraq Frontend və ya ilk mövqe ID-si
    budget: '',
    clientName: currentUser ? `${currentUser.name} ${currentUser.surname}` : '',
    clientEmail: currentUser ? currentUser.email : '',
  });


  // Input dəyişəndə state-i yeniləyən funksiya
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Göndərmə (Submit) Məntiqi
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "Pending"
    };

    try {
      await dispatch(addOrder({ newOrder, fullData: data })).unwrap();
      toast.success("Sifarişiniz uğurla göndərildi!", toast_config);
      navigate('/'); // Və ya sifarişlər səhifəsinə
    } catch (error) {
      toast.error("Sifariş göndərilərkən xəta baş verdi.", toast_config);
    }
  };


  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner-icon" size={60} />
        <p>Sorğunuz sistemə işlənir...</p>
      </div>
    );
  }

  return (
    <div className="order-page-wrapper">
      <Header />

      <div className="container my-5">
        <div className="order-header-section">
          <h1 className="order-title">Layihəni <span>Başlat</span></h1>
          <p className="order-subtitle">
            Texniki tələblərinizi göndərin və biznes infrastrukturunuzu qurmaq üçün peşəkar mühəndis qrupumuzu aktivləşdirin.
          </p>
        </div>

        <div className="order-form-container">
          <form onSubmit={handleSubmit} className="cyber-order-form">

            {/* Sifariş Başlığı */}
            <div className="form-group-cyber">
              <label><FiFileText className="input-icon-label" /> Layihənin Adı *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="məsələn: E-Ticarət Platforması"
                required
              />
            </div>

            {/* İki sütunlu sahə (Kateqoriya və Büdcə) */}
            <div className="form-row-cyber">
              <div className="form-group-cyber">
                <label><FiLayers className="input-icon-label" /> Tələb Olunan Sahə *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="1">Frontend İnkişafı</option>
                  <option value="2">Backend Mühəndisliyi</option>
                  <option value="3">Mobil Tətbiqlər</option>
                  <option value="4">DevOps və Sistem İdarəetmə</option>
                  <option value="5">Layihə İdarəetməsi</option>
                  <option value="6">Biznes Analitika</option>
                </select>
              </div>

              <div className="form-group-cyber">
                <label><FiDollarSign className="input-icon-label" /> Təxmini Büdcə ($)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="məsələn: 5000"
                />
              </div>
            </div>

            {/* İki sütunlu sahə (Müştəri Adı və Email) */}
            <div className="form-row-cyber">
              <div className="form-group-cyber">
                <label><FiUser className="input-icon-label" /> Adınız və Soyadınız *</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Ad Soyad"
                  required
                />
              </div>

              <div className="form-group-cyber">
                <label><FiMail className="input-icon-label" /> Əlaqə E-poçtu *</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  placeholder="nümunə@email.com"
                  required
                />
              </div>
            </div>

            {/* Layihənin İzahı */}
            <div className="form-group-cyber">
              <label><FiFileText className="input-icon-label" /> Layihə Spesifikasiyası və Tapşırıqlar *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Layihənin yol xəritəsini, əsas funksiyaları və gözlənilən texnoloji stack-i ətraflı qeyd edin..."
                required
              ></textarea>
            </div>

            {/* Göndərmə Düyməsi */}
            <button type="submit" className="submit-cyber-btn" disabled={loading}>
              {loading ? (
                <span>Sorğu Göndərilir...</span>
              ) : (
                <>
                  <span>Sifarişi Təsdiqlə</span>
                  <FiSend className="btn-send-icon" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderApp;