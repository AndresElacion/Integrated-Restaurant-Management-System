import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Category, FormData } from '../../types';
import Navbar from '../Navbar';
import apiURL from '../../axios';
import Loading from '../Loading';

export default function AddItems() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        category: '',
        price: '',
        status: 'active',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const categories = async () => {
            try {
                const response = await apiURL.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            };

        };
            categories();
    }, []);

    const resetForm = () => {
        setFormData({
            name: '',
            category: '',
            price: '',
            status: 'active',
        });
        setTimeout(() => {
            setSuccess(false);
        }, 3000)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiURL.post('/api/items', formData);
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
                    <h2 className="text-xl font-semibold text-gray-900">Add New Menu Item</h2>
                    {success && (
                        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <span className="font-medium">Success!</span> Item created successfully.
                        </div>
                    )}
                </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="">
                            {/* Left Column - Form Fields */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <div className="mt-1 relative rounded-lg">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="block w-full pl-7 pr-12 border border-gray-300 rounded-lg px-4 py-2
                                            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
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
