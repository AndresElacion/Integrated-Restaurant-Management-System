import React, { useState } from 'react';

const Registration: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle registration logic here
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
				<h2 className="text-2xl mb-4">Register</h2>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2" htmlFor="username">
						Username
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default Registration;