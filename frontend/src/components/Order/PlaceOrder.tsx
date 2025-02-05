import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiURL from '../../axios';
import { MenuItem, OrderItem } from '../../types';
import Navbar from '../Navbar';

export default function PlaceOrder() {
    const navigate = useNavigate();
    const [items, setItems] = useState<MenuItem[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await apiURL.get<MenuItem[]>('/api/items');
                setItems(response.data.filter(item => item.status === 'active'));
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };
        fetchItems();
    }, []);

    const addToOrder = (item: MenuItem) => {
        setOrderItems(prev => {
            const existingItem = prev.find(i => i.itemId === item.id);
            if (existingItem) {
                return prev.map(i => 
                    i.itemId === item.id 
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, {
                id: Date.now(),
                itemId: item.id,
                name: item.name,
                quantity: 1,
                price: item.price,
                category: item.category,
                status: item.status
            }];
        });
    };

    const removeFromOrder = (itemId: number) => {
        setOrderItems(prev => prev.filter(item => item.itemId !== itemId));
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        setOrderItems(prev => 
            prev.map(item => 
                item.itemId === itemId 
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const calculateTotal = () => {
        return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handlePlaceOrder = async () => {
        if (orderItems.length === 0) {
            alert('Please add items to your order');
            return;
        }

        try {
            const order = {
                items: orderItems,
                totalAmount: calculateTotal(),
                status: 'pending'
            };
            const response = await apiURL.post('/api/orders', order);
            navigate(`/payment-confirmation/${response.data.id}`);
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Menu Items */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {items.map(item => (
                                <div key={item.id} className="border p-4 rounded-lg">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price}</p>
                                    <button
                                        onClick={() => addToOrder(item)}
                                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="border rounded-lg p-4">
                            {orderItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center mb-2">
                                    <span>{item.name}</span>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span>${item.price * item.quantity}</span>
                                        <button
                                            onClick={() => removeFromOrder(item.itemId)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="border-t mt-4 pt-4">
                                <div className="flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full mt-4 bg-green-500 text-white py-2 rounded-md"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
