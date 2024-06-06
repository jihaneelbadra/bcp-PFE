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
      <div className="bg-orange-custom w-screen h-1/4 absolute flex items-center justify-center">
        <img src="src\assets\1280px-Logo_BCP.svg.png" className="h-20" alt="Logo" />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative w-full md:w-96">
          <h1 className="text-xl font-bold text-center mb-10">Se connecter</h1>
          <form onSubmit={handleSubmit}>
            <div className="relative my-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-300 peer-focus:-translate-y-16 peer-focus:text-gray-300 peer-focus:dark:text-blue-500 peer-focus:scale-75" htmlFor="email">Email</label>
            </div>
            <div className="relative my-4 mt-10">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-300 peer-focus:-translate-y-16 peer-focus:text-gray-300 peer-focus:dark:text-blue-500 peer-focus:scale-75" htmlFor="password">Password</label>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button type="submit" className="w-full bg-orange-custom text-gray-600 py-2 rounded-md mt-4 hover:bg-[#E2B68D]">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
