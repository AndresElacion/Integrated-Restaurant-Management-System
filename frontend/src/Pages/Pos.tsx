import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import Navbar from '../components/Navbar';
import { Category, MenuItem } from '../types';
import apiURL from '../axios';
import { format } from 'date-fns';

export default function POS() {
    const setSelectedCategory = useState(0)[1];
    const [categories, setCategories] = useState<Category[]>([])
    const [items, setItems] = useState<MenuItem[]>([]);

    // Need to double check if this is needed, probably not
    const [orderItems, setOrderItems] = useState([
        { name: 'Menu Item 1', price: 12.99, quantity: 1 },
        { name: 'Menu Item 2', price: 15.99, quantity: 1 },
        { name: 'Menu Item 3', price: 9.99, quantity: 1 },
    ]);

    useEffect(() => {
        const categories = async () => {
            try {
                const response = await apiURL.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.log('Failed to fetch categories:', error);
            }
        }
        categories();
    }, [])

    useEffect(() => {
        const itemFetch = async () => {
            try {
                const response = await apiURL.get<MenuItem[]>('/api/items');
                setItems(response.data);
            } catch (error) {
                console.log('Failed to fetch items:', error);
            }
        }
        itemFetch();
    }, []);

    function updateQuantity(index: number, amount: number): void {
        setOrderItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index].quantity += amount;
            if (newItems[index].quantity < 1) {
                newItems[index].quantity = 1;
            }
            return newItems;
        });
    }

    function removeItem(index: number): void {
        setOrderItems((prevItems) => prevItems.filter((_, i) => i !== index));
    }

  return (
        <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Main Layout */}
        <div className="flex h-screen">
            {/* Left Side - Menu */}
            <div className="w-2/3 p-6 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Restaurant POS</h1>
                          <p className="text-sm text-gray-500">{format(new Date(), 'EEEEEEEEE, d MMM yyy')}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search menu..."
                                className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <TabGroup onChange={setSelectedCategory}>
                    <TabList className="flex space-x-2 mb-6">
                        {categories.map((category) => (
                            <Tab
                                key={category.id}
                                className={({ selected }) =>
                                    `px-4 py-2 text-sm font-medium rounded-lg transition-all
                                    ${selected 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`
                                }
                                >
                                {category.name}
                            </Tab>
                        ))}
                    </TabList>

                    {/* Menu Grid */}
                    <TabPanels className="h-[calc(100vh-220px)] overflow-y-auto">
                        <div className="grid grid-cols-3 gap-4">
                            {items.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                
                                <div className='flex justify-between items-center'>
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className={`px-2 py-1 text-sm font-medium rounded-full uppercase ${item.status === 'active' ? 'bg-green-100' : 'bg-red-100'}`}>{item.status}</p>    
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                        <span className="font-bold text-blue-600">₱ {item.price}</span>
                                    <button className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                            ))}
                        </div>
                    </TabPanels>
                </TabGroup>
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-1/3 bg-gray-50 border-l border-gray-200 p-6">
                <div className="flex flex-col h-full">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Current Order</h2>
                    
                    {/* Order Items */}
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {orderItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <p className="text-sm">No items in cart</p>
                            </div>
                        ) : (
                            orderItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                    </div>
                                    <button 
                                        onClick={() => removeItem(index)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => updateQuantity(index, -1)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                            >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(index, 1)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                            >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="font-medium text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </motion.div>
                            ))
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>$45.97</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>$4.60</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>$50.57</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                Clear
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}