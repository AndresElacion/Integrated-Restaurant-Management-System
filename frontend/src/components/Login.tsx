import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiURL from '../axios';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { setIsAuthenticated } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await apiURL.get("/sanctum/csrf-cookie")
			await apiURL.post('/login', { email, password }, {
				withCredentials: true,
			});
			setIsAuthenticated(true);
			navigate('/');
		} catch (error) {
			setError('Invalid credentials');
			console.error('Login failed:', error);
		}
	};

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
				<div className="flex flex-col items-center mb-6">
					<img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
						className="w-12"/>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && <div className="text-red-500 mb-4">{error}</div>}
					<h2 className="text-2xl mb-4">Login</h2>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							required
						/>
					</div>
					<button type="submit" className="w-full py-1 text-nowrap font-semibold bg-gray-800 text-white rounded-md hover:bg-gray-900">
						Login
					</button>

					{/* Login Link */}
					<p className="text-sm text-center text-gray-600">
						Don't have an account? 
						<a href="/register" className="text-indigo-600 hover:underline">
							Register
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;