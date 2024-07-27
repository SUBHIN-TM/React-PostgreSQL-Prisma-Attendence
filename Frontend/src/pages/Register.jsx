import { useState } from 'react';
import axios from '../utils/axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    departmentId: '',
    branchId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert departmentId and branchId to numbers here
    const dataToSend = {
      ...formData,
      departmentId: Number(formData.departmentId),
      branchId: Number(formData.branchId),
    };

    try {
      const response = await axios.post('/api/auth/register', dataToSend);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="number"
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
        placeholder="Department ID"
      />
      <input
        type="number"
        name="branchId"
        value={formData.branchId}
        onChange={handleChange}
        placeholder="Branch ID"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
