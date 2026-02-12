import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../apiConfig';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Clean username/password
            const cleanUsername = username.trim();
            const cleanPassword = password.trim();

            const res = await axios.post(`${API_URL}/auth/login`, {
                username: cleanUsername,
                password: cleanPassword
            });

            // Save token
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            // Redirect to admin
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#111] p-8 rounded-xl border border-gray-800 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h2>

                {error && (
                    <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4 text-sm border border-red-800">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#222] text-white border border-gray-700 rounded p-3 focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#222] text-white border border-gray-700 rounded p-3 focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
