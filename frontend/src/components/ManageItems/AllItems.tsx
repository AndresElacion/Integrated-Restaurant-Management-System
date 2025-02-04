import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default function AllItems() {

  return (
        <div>
          <Navbar />
            {/* Header */}
            <div className='mt-8 container mx-auto px-4'>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Manage Menu Items</h2>
                    <Link to="/add/items"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                            transition-colors flex items-center space-x-2">
                        <span>Add Item</span>
                    </Link>
                        
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent"
                    />
                    </div>
                    <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                    <option value="">All Categories</option>
                    <option value="hot-dishes">Hot Dishes</option>
                    <option value="cold-dishes">Cold Dishes</option>
                    <option value="soup">Soup</option>
                    <option value="grill">Grill</option>
                    <option value="dessert">Dessert</option>
                    </select>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                    <thead className="bg-gray-50 border-y border-gray-200">
                        <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        
                        <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-gray-50"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">item 1</div>
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            soup
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            $12
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                            >
                                available
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                            </div>
                            </td>
                        </motion.tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}