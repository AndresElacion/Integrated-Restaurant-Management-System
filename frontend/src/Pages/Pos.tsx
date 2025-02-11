import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import Navbar from '../components/Navbar';
import { Category, MenuItem, OrderItem } from '../types';
import apiURL from '../axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function POS() {
    const [categories, setCategories] = useState<Category[]>([])
    const [items, setItems] = useState<MenuItem[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(0);
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredItems(filtered);
    }

    const addToOrder = (item: MenuItem) => {
        setOrderItems(prevItems => {
            const existingItem = prevItems.find(orderItem => orderItem.id === item.id);

            if (existingItem) {
                return prevItems.map(orderItem => 
                    orderItem.id === item.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
                )
            }

            return [...prevItems, { ...item, quantity: 1, itemId: item.id }];
        })
    }

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
                setFilteredItems(response.data);
            } catch (error) {
                console.log('Failed to fetch items:', error);
            }
        }
        itemFetch();
    }, []);

    const filterItemsByCategory = (categoryId: number) => {
        setSelectedCategory(categoryId === 0 ? 0 : categories.findIndex(cat => cat.id === categoryId) + 1);
        let filtered = [...items];
        
        if (categoryId !== 0) {
            filtered = filtered.filter(item => {
                // Compare category IDs directly
                return parseInt(item.category) === categoryId;
            });
        }

        if (searchQuery) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        console.log('Category ID:', categoryId);
        console.log('Filtered Items:', filtered);
        
        setFilteredItems(filtered);
    }

    const updateQuantity = (itemId: number, amount: number) => {
        setOrderItems((prevItems) => {
            return prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + amount;
                    return newQuantity < 1 ? item : { ...item, quantity: newQuantity };
                }
                return item;
           })
        });
    }

    const removeItem = (itemId: number) => {
        setOrderItems(prevItems => prevItems.filter(item => item.id !== itemId))
    }

    const calculateTotals = () => {
        const subtotal = orderItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0)

        const tax = subtotal * 0.05 // 5% tax change it to correct
        const total = subtotal + tax

        return { subtotal, tax, total }
    }

    const formatCategoryName = (name: string) => {
        return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    const handlePlaceOrder = async () => {
        if (orderItems.length === 0) {
            alert('Please add items to your order');
            return;
        }

        try {
            const { total, subtotal, tax } = calculateTotals();
            
            const order = {
                items: orderItems.map(item => ({
                    item_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: item.price * item.quantity
                })),
                subtotal: subtotal,
                tax: tax,
                total_amount: total
            };

            const response = await apiURL.post('/api/orders', order);
            
            if (response.data.id) {
                navigate(`/payment-confirmation/${response.data.id}`, {
                    state: { 
                        totalAmount: total,
                        orderItems: orderItems,
                        subtotal: subtotal,
                        tax: tax
                    }
                });
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    const handleClearOrder = () => {
        setOrderItems([]);
    };

  return (
        <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Main Layout */}
        <div className="flex">
            {/* Left Side - Menu */}
            <div className="w-2/3 p-6 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Restaurant POS</h1>
                          <p className="text-sm text-gray-500">{format(new Date(), 'EEEEEEEEE, MMM dd, yyy')}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                  placeholder="Search menu..."
                                  value={searchQuery}
                                  onChange={(e) => handleSearch(e.target.value)}
                                className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <TabGroup
                    selectedIndex={selectedCategory}
                    onChange={(index) => {
                        if (index === 0) {
                            filterItemsByCategory(0);
                        } else {
                            const categoryId = categories[index - 1]?.id;
                            filterItemsByCategory(categoryId);
                        }
                    }}
                >
                    <TabList className="flex space-x-2 mb-6">
                          <Tab
                        className={({ selected }) =>
                            `px-4 py-2 text-sm font-medium rounded-lg transition-all
                            ${selected 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'text-gray-500 hover:bg-gray-100'
                            }`
                        }
                    >
                        All
                    </Tab>
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
                                {formatCategoryName(category.name)}
                            </Tab>
                        ))}
                    </TabList>

                    {/* Menu Grid */}
                    <TabPanels className="h-[calc(100vh-250px)] overflow-y-auto">
                        <div className="grid grid-cols-3 gap-4">
                            {filteredItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => addToOrder(item)}    
                                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                
                                <div className='flex justify-between items-center'>
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <span className="font-bold text-blue-600">₱ {item.price}</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className={`px-2 py-1 text-sm font-medium rounded-full uppercase ${item.status === 'active' ? 'bg-green-100' : 'bg-red-100'}`}>{item.status}</p>
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
                                        onClick={() => removeItem(item.id)}
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
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                            >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                                            >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="font-medium text-gray-900">
                                        ₱{(item.price * item.quantity).toFixed(2)}
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
                                <span>₱ {calculateTotals().subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>₱ {calculateTotals().tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>₱ {calculateTotals().total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button 
                                onClick={handleClearOrder}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Clear
                            </button>
                            <button 
                                onClick={handlePlaceOrder}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                disabled={orderItems.length === 0}
                            >
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