import React, { useState } from 'react';
import api from '/src/utils/axios'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { username, password });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
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
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                            <label htmlFor="" className="absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>
                        <div className="relative my-4">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                            <label htmlFor="" className="absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Your password</label>
                        </div>
                        <button type="submit" className="w-full bg-orange-custom text-white py-2 rounded-md mt-4">Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
