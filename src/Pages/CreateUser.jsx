import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { toast_config } from '../Utils/confiq';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { fetchAllData, addUser } from '../Slices/homeSlice';
import { FaSpinner } from 'react-icons/fa6';

function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedPosition, setSelectedPosition] = useState(null);

  const { data, loading } = useSelector(store => store.homeSlice);

  const { users, positions } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!positions || positions.length === 0) {
      dispatch(fetchAllData());
    }
  }, [positions, dispatch]);

  const handleInputChange = (e) => setPassword(e.target.value);
  const handleCheckboxChange = (e) => setShowPassword(e.target.checked);

  function validate(data) {
    const errors = { name: "", surname: "", email: "", userName: "", password: "", phone: "" };
    if (!data.name) errors.name = "Ad tələb olunur";
    if (!data.surname) errors.surname = "Soyad tələb olunur";
    if (!data.email) errors.email = "E-poçt tələb olunur";
    if (!data.userName) errors.userName = "İstifadəçi adı tələb olunur";
    if (!data.password) errors.password = "Şifrə tələb olunur";
    if (!data.phone) errors.phone = "Telefon nömrəsi tələb olunur";
    return errors;
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInputData = Object.fromEntries(formData.entries());

    const errors = validate(formInputData);
    setValidationErrors(errors);

    if (Object.values(errors).some(err => err !== "")) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun", toast_config);
      return;
    }
    if (formInputData.password.length <= 5) {
      toast.error("Şifrə minimum 6 simvoldan ibarət olmalıdır", toast_config);
      return;
    }
    if (users.find(item => item.userName.toUpperCase() === formInputData.userName.toUpperCase())) {
      toast.error("Bu istifadəçi adı artıq qeydiyyatdan keçib", toast_config);
      return;
    }
    if (!selectedPosition) {
      toast.error("Zəhmət olmasa vəzifə seçin", toast_config);
      return;
    }

    const newUser = {
      ...formInputData,
      id: Date.now().toString(),
      positionId: selectedPosition.id
    };

    try {
      await dispatch(addUser({ newUser, fullData: data })).unwrap();
      toast.success("İstifadəçi uğurla yaradıldı", toast_config);
      navigate('/');
    } catch (er) {
      toast.error("Qeydiyyat zamanı xəta baş verdi", toast_config);
      console.log(er);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner-icon" size={60} />
        <p>Istifadəçi yaradılır...  </p>
      </div>
    );
  }

  return (
    <div className='createUser-layout'>
      <div className='form-container-wrapper'>
        <div className='form-card'>
          <h2 className='form-title'>İstifadəçi <span>Yarat</span></h2>
          <p className='form-subtitle'>Yeni işçini sistemə qeydiyyatdan keçirmək üçün məlumatları daxil edin</p>

          <Form onSubmit={handleCreateUser} className='modern-form-grid'>
            <div className="form-group-item">
              <Label className='form-label' htmlFor='name'>Ad</Label>
              <Input name='name' id='name' placeholder="John" className={validationErrors.name ? "border-danger-glow" : ""} />
            </div>

            <div className="form-group-item">
              <Label className='form-label' htmlFor='surname'>Soyad</Label>
              <Input name='surname' id='surname' placeholder="Doe" className={validationErrors.surname ? "border-danger-glow" : ""} />
            </div>

            <div className="form-group-item">
              <Label className='form-label' htmlFor='userName'>İstifadəçi adı</Label>
              <Input name='userName' id='userName' placeholder="johndoe12" className={validationErrors.userName ? "border-danger-glow" : ""} />
            </div>

            <div className="form-group-item">
              <Label className='form-label' htmlFor='phone'>Telefon</Label>
              <Input name='phone' id='phone' placeholder="+994 (50) 000-00-00" className={validationErrors.phone ? "border-danger-glow" : ""} />
            </div>

            <div className="form-group-item full-width">
              <Label className='form-label' htmlFor='email'>E-poçt ünvanı</Label>
              <Input name='email' id='email' type='email' placeholder="johndoe@company.com" className={validationErrors.email ? "border-danger-glow" : ""} />
            </div>

            <div className="form-group-item full-width">
              <Label className='form-label'>Vəzifə</Label>
              <Select
                className='react-select'
                classNamePrefix="react-select"
                options={positions}
                onChange={setSelectedPosition}
                getOptionLabel={(o) => o.name}
                getOptionValue={(o) => o.id}
                placeholder="Vəzifə seçin..."
              />
            </div>

            <div className="form-group-item full-width password-group">
              <Label className='form-label' htmlFor='password'>Şifrə</Label>
              <Input
                value={password} name='password' id='password' type={showPassword ? "text" : "password"}
                onChange={handleInputChange} placeholder="••••••••"
              />
              <div className="checkbox-wrapper">
                <Input type='checkbox' id='checkbox' onChange={handleCheckboxChange} checked={showPassword} />
                <Label htmlFor='checkbox' className='checkbox-label'>Şifrəni göstər</Label>
              </div>
            </div>

            <div className='form-actions full-width'>
              <Button type='submit' className='submit-neon-btn' disabled={loading}>
                {loading ? "Gözləyin..." : "İstifadəçini Qeydiyyatdan Keçir"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;