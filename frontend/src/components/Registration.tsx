import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import { useNavigate } from 'react-router-dom';
import apiURL from '../axios';  // Import the axios instance

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Ensure CSRF token is set
      	try {
			await apiURL.get("/sanctum/csrf-cookie")

			// Now, make the registration request
			await apiURL.post('/register', formData);

      		navigate('/'); // Navigate on success
		} catch (error) {
			console.error('Error getting token', error);
		}
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error here (e.g., show an error message)
    }
  };

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
				<h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
					Create an Account
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Name */}
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Full Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							placeholder="John Doe"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Email */}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							placeholder="you@example.com"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Password */}
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Confirm Password */}
					<div>
						<label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
							Confirm Password
						</label>
						<input
							type="password"
							id="password_confirmation"
							name="password_confirmation"
							className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
							placeholder="••••••••"
							value={formData.password_confirmation}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Submit Button */}
					<div>
						<button
							type="submit"
							className="w-full py-1 text-nowrap font-semibold bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
						>
							Register
						</button>
					</div>
					{/* Login Link */}
					<p className="text-sm text-center text-gray-600">
						Already have an account?
						<a href="/login" className="text-indigo-600 hover:underline">
							Log in
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Registration;