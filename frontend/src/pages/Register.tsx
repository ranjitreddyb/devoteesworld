import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    maritalStatus: 'single',
    healthStatus: {
      diabetic: false,
      bp: false,
      heartAilment: false,
      recentSurgery: false,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const [key, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [key]: {
          ...((prev as any)[key as keyof typeof formData] || {}),
          [field]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = formData;
      await register(submitData);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-8">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="px-4 py-2 border rounded" required />
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="px-4 py-2 border rounded" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="px-4 py-2 border rounded" required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="px-4 py-2 border rounded" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="px-4 py-2 border rounded" required />
            <input type="tel" name="phoneNumber" placeholder="+919876543210" value={formData.phoneNumber} onChange={handleChange} className="px-4 py-2 border rounded" required />
          </div>
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-3">Health Status</h3>
            <label className="flex items-center mb-2">
              <input type="checkbox" name="healthStatus.diabetic" checked={formData.healthStatus.diabetic} onChange={handleChange} className="mr-2" />
              Diabetic
            </label>
            <label className="flex items-center mb-2">
              <input type="checkbox" name="healthStatus.bp" checked={formData.healthStatus.bp} onChange={handleChange} className="mr-2" />
              High BP
            </label>
            <label className="flex items-center mb-2">
              <input type="checkbox" name="healthStatus.heartAilment" checked={formData.healthStatus.heartAilment} onChange={handleChange} className="mr-2" />
              Heart Ailment
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="healthStatus.recentSurgery" checked={formData.healthStatus.recentSurgery} onChange={handleChange} className="mr-2" />
              Recent Surgery
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 font-semibold">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
