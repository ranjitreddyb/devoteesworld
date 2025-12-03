import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    maritalStatus: 'single',
    healthStatus: {
      diabetic: false,
      bp: false,
      heartAilment: false,
      recentSurgery: false,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      healthStatus: { ...formData.healthStatus, [name]: checked },
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        toast.success('✅ Registration successful!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || '❌ Registration failed');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('❌ Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgb(147, 51, 234), rgb(249, 115, 22))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', maxWidth: '550px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'rgb(31, 41, 55)' }}>📝 Register</h1>
        <p style={{ textAlign: 'center', color: 'rgb(107, 114, 128)', marginBottom: '2rem', fontSize: '0.95rem' }}>Join DevoteesWorld</p>

        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          {/* Full Name */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>👤 Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }} required />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>📧 Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }} required />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>📱 Phone</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+919876543210" style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }} required />
          </div>

          {/* Date of Birth */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>📅 Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }} required />
          </div>

          {/* Address */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>📍 Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }} />
          </div>

          {/* Marital Status */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>💑 Marital Status</label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box', backgroundColor: 'white' }}>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          {/* Health Status - Checkboxes */}
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgb(249, 250, 251)', borderRadius: '0.75rem', border: '1px solid rgb(229, 231, 235)' }}>
            <label style={{ display: 'block', fontWeight: '600', color: 'rgb(31, 41, 55)', marginBottom: '1rem' }}>🏥 Health Status</label>
            
            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="diabetic" checked={formData.healthStatus.diabetic} onChange={handleHealthChange} style={{ marginRight: '0.5rem', cursor: 'pointer' }} />
              <label style={{ cursor: 'pointer', margin: 0 }}>Diabetic</label>
            </div>

            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="bp" checked={formData.healthStatus.bp} onChange={handleHealthChange} style={{ marginRight: '0.5rem', cursor: 'pointer' }} />
              <label style={{ cursor: 'pointer', margin: 0 }}>High Blood Pressure</label>
            </div>

            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="heartAilment" checked={formData.healthStatus.heartAilment} onChange={handleHealthChange} style={{ marginRight: '0.5rem', cursor: 'pointer' }} />
              <label style={{ cursor: 'pointer', margin: 0 }}>Heart Ailment</label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="recentSurgery" checked={formData.healthStatus.recentSurgery} onChange={handleHealthChange} style={{ marginRight: '0.5rem', cursor: 'pointer' }} />
              <label style={{ cursor: 'pointer', margin: 0 }}>Recent Surgery</label>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>🔑 Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid rgb(229, 231, 235)', borderRadius: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }} required />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', background: loading ? 'rgb(200, 200, 200)' : 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1.05rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? '⏳ Registering...' : '✨ Register'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid rgb(229, 231, 235)', paddingTop: '1.5rem' }}>
          <p style={{ color: 'rgb(107, 114, 128)', margin: 0 }}>Already have an account? <a href="/login" style={{ color: 'rgb(249, 115, 22)', fontWeight: 'bold' }}>Login here</a></p>
        </div>
      </div>
    </div>
  );
}
