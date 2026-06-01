import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../Components/Header/Header';
import { apiUrl, toast_config } from '../Utils/confiq';
import { FiSend, FiFileText, FiUser, FiMail, FiLayers, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function OrderApp() {
  // Giriş etmiş istifadəçinin məlumatlarını çəkirik (opsional olaraq formu doldurmaq üçün)
  const { currentUser } = useSelector((store) => store.homeSlice);
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

  const [loading, setLoading] = useState(false);

  // Input dəyişəndə state-i yeniləyən funksiya
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Göndərmə (Submit) Məntiqi
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sadə sahə yoxlanışı (Validation)
    if (!formData.title || !formData.description || !formData.clientName || !formData.clientEmail) {
      toast.error('Please fill in all required fields.', toast_config);
      return;
    }

    setLoading(true);

    const newOrder = {
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'Pending', // Yeni gələn sifarişin ilkin statusu
    };

    axios
      .post(`${apiUrl}/orders`, newOrder)
      .then((res) => {
        toast.success('Your project request has been submitted successfully!', toast_config);
        // Formu sıfırlayırıq (Giriş etmiş istifadəçinin fərdi dataları qalmaq şərti ilə)
        setFormData({
          title: '',
          description: '',
          category: '1',
          budget: '',
          clientName: currentUser ? `${currentUser.name} ${currentUser.surname}` : '',
          clientEmail: currentUser ? currentUser.email : '',
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong. Please try again.', toast_config);
      })
      .finally(() => {
        setLoading(false);
        navigate('/');
      });
  };

  return (
    <div className="order-page-wrapper">
      <Header />

      <div className="container my-5">
        <div className="order-header-section">
          <h1 className="order-title">Launch Your <span>Project</span></h1>
          <p className="order-subtitle">
            Submit your technical requirements and deploy our top-tier engineers to build your software infrastructure.
          </p>
        </div>

        <div className="order-form-container">
          <form onSubmit={handleSubmit} className="cyber-order-form">
            
            {/* Sifariş Başlığı */}
            <div className="form-group-cyber">
              <label><FiFileText className="input-icon-label" /> Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., E-Commerce Platform Development"
                required
              />
            </div>

            {/* İki sütunlu sahə (Kateqoriya və Büdcə) */}
            <div className="form-row-cyber">
              <div className="form-group-cyber">
                <label><FiLayers className="input-icon-label" /> Required Domain *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="1">Frontend Development</option>
                  <option value="2">Backend Engineering</option>
                  <option value="3">Mobile Applications</option>
                  <option value="4">DevOps & SysAdmin</option>
                  <option value="5">Project Management</option>
                  <option value="6">Business Analytics</option>
                </select>
              </div>

              <div className="form-group-cyber">
                <label><FiDollarSign className="input-icon-label" /> Estimated Budget ($)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                />
              </div>
            </div>

            {/* İki sütunlu sahə (Müştəri Adı və Email) */}
            <div className="form-row-cyber">
              <div className="form-group-cyber">
                <label><FiUser className="input-icon-label" /> Your Name *</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group-cyber">
                <label><FiMail className="input-icon-label" /> Contact Email *</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Layihənin İzahı */}
            <div className="form-group-cyber">
              <label><FiFileText className="input-icon-label" /> Project Specifications & Tasks *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Provide a detailed roadmap, features, and technology stack expectations..."
                required
              ></textarea>
            </div>

            {/* Göndərmə Düyməsi */}
            <button type="submit" className="submit-cyber-btn" disabled={loading}>
              {loading ? (
                <span>Deploying Request...</span>
              ) : (
                <>
                  <span>Submit Task Order</span>
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