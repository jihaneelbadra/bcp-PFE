import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/authenticate', { email, password });
      console.log('Response:', response.data);

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        setError('Information incorrecte');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="relative h-screen">
      <div className="bg-orange-custom w-full py-10 absolute top-0 left-0 flex items-center justify-center">
        <img src="../src/assets/bcp_tech_maroc_cover.png" className="h-12" alt="Logo" />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative w-full md:w-96">
          <h1 className="text-4xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="relative my-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label className="absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative my-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label className="absolute text-sm duration-300 transform -translate scale-75 top-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="w-full bg-orange-custom text-white py-2 rounded-md mt-4">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
