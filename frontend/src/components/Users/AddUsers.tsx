import { useState } from 'react';
import { motion } from 'framer-motion';
import { AddUserData } from '../../types';
import Navbar from '../Navbar';
import apiURL from '../../axios';
import Loading from '../Loading';

export default function AddUsers() {
    const [addUser, setAddUser] = useState<AddUserData>({
        id: 0,
        name: '',
        email: '',
        role: '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const resetForm = () => {
        setAddUser({
            id: 0,
            name: '',
            email: '',
            role: '',
            password: '',
            password_confirmation: ''
        });
        setTimeout(() => {
            setSuccess(false);
        }, 3000)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (addUser.password !== addUser.password_confirmation) {
            alert('Password do not match')
            return
        }

        if (addUser.password.length < 8) {
            alert('Password must be at least 8 characters long')
        }

        setLoading(true)
        try {
            const response = await apiURL.post('/api/users', addUser);
            console.log(response.data);
            setSuccess(true);
            resetForm();
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        };

        if (loading) {
            return <div>
                <Loading />
            </div>;
        }
    };

  return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
                    {success && (
                        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <span className="font-medium">Success!</span> User created successfully.
                        </div>
                    )}
                </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="">
                            {/* Left Column - Form Fields */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={addUser.name}
                                        onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={addUser.email}
                                        onChange={(e) => setAddUser({ ...addUser, email: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Role
                                    </label>
                                    <select
                                        value={addUser.role}
                                        onChange={(e) => setAddUser({ ...addUser, role: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        <option value="admin">Admin</option>
                                        <option value="chef">Chef</option>
                                        <option value="chasier">Chashier</option>
                                        <option value="waiter">Waiter</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={addUser.password}
                                        onChange={(e) => setAddUser({ ...addUser, password: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={addUser.password_confirmation}
                                        onChange={(e) => setAddUser({ ...addUser, password_confirmation: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                                flex items-center space-x-2"
                            >
                                {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                    </svg>
                                    <span>Processing...</span>
                                </>
                                ) : (
                                <>
                                    <span>Submit</span>
                                </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
