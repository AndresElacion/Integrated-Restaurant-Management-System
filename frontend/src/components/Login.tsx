import React, { useState } from 'react';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle login logic here
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
				<h2 className="text-2xl mb-4">Login</h2>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border rounded w-full py-2 px-3"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border rounded w-full py-2 px-3"
						required
					/>
				</div>
				<button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
				Login
				</button>
			</form>
		</div>
	);
};

export default Login;