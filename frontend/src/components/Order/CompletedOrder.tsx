import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import apiURL from '../../axios';
import { CompletedOrders, CompletedOrderItem } from '../../types';

export default function CompletedOrder() {
    const [orders, setOrders] = useState<CompletedOrders[]>([]);

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white hover:bg-gray-50 shadow-md rounded-lg p-4 flex flex-col justify-between border border-gray-200">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Order # 2
                                </h2>
                                {order.items.map((item: CompletedOrderItem, index) => (
                                    <div key={index}>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {item.name} x {item.quantity}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            ₱ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                                <p className="text-sm text-gray-600 mt-1">
                                    Status: <span className="font-medium text-gray-800">Completed</span>
                                </p>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm text-gray-600 mt-2">
                                    Tax: <span className="uppercase font-semibold">{order.tax}</span>
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    ₱ {order.total_amount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}