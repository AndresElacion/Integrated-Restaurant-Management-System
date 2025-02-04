import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../types';
import Navbar from '../Navbar';

export default function AddItemForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        category: '',
        price: '',
        description: '',
        status: true,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // API call logic here
        setLoading(false);
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
                                        <option value="hot-dishes">Hot Dishes</option>
                                        <option value="cold-dishes">Cold Dishes</option>
                                        <option value="soup">Soup</option>
                                        <option value="grill">Grill</option>
                                        <option value="dessert">Dessert</option>
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2
                                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                        type="checkbox"
                                        checked={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                                        className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                                        peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full
                                        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                                        after:left-[2px] after:bg-white after:border-gray-300 after:border
                                        after:rounded-full after:h-5 after:w-5 after:transition-all
                                        peer-checked:bg-blue-600"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-700">Active Status</span>
                                    </label>
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