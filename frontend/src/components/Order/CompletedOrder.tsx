import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import apiURL from '../../axios';
import Loading from '../Loading';
import { CompletedOrders, CompletedOrderItem } from '../../types';

export default function CompletedOrder() {
    const [orders, setOrders] = useState<CompletedOrders[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const itemFetch = async () => {
            try {
                const response = await apiURL.get<CompletedOrders[]>('/api/completed/order');
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };
        itemFetch();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return;
        }

        setLoading(true);

        try {
            await apiURL.delete(`/api/items/${id}`);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error('Failed to delete item:', error);
        } finally {
            setLoading(false);
        }

        if (loading) {
            return <div>
                <Loading />
            </div>;
        }
    };

    return (
        <div>
          <Navbar />
            {/* Header */}
            <div className='mt-8 container mx-auto px-4'>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Completed Order</h2>
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
                            {orders.map((order) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.items.map((item: CompletedOrderItem, index) => (
                                            <div key={index}>
                                                <div  className="flex items-center space-x-2">
                                                    <span>{item.name}</span>
                                                    <span>x {item.quantity}</span>
                                                </div>
                                            </div>
                                            
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${order.total_amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.status}
                                    </td>
                                    <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                        <Link to={`/edit/item/${order.id}`} className="text-blue-600 hover:text-blue-900">
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(order.id)} 
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}