import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiURL from '../../axios';
import { Order } from '../../types';
import { useLocation } from 'react-router-dom';

export default function PaymentConfirmation() {
    const { state } = useLocation();
    const { totalAmount, items, subtotal, tax } = state || {};
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [cashReceived, setCashReceived] = useState<number>(0);
    const [change, setChange] = useState<number>(0);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await apiURL.get<Order>(`/api/orders/${orderId}`);
                setOrder({
                    ...response.data,
                    totalAmount,
                    items,
                    subtotal,
                    tax
                });
            } catch (error) {
                console.error('Failed to fetch order:', error);
            }
        };
        fetchOrder();
    }, [orderId, totalAmount, items, subtotal, tax]);

    const handlePayment = async () => {
        if (!order || cashReceived < totalAmount) {
            alert('Insufficient payment amount');
            return;
        }

        try {
            await apiURL.put(`/api/orders/${orderId}`, {
                ...order,
                status: 'completed',
                paymentMethod: 'cash',
                cashReceived,
                change: cashReceived - totalAmount
            });
            navigate('/pos', {
                state: {
                    orderId,
                    totalAmount,
                    cashReceived,
                    change: cashReceived - totalAmount
                }
            });
        } catch (error) {
            console.error('Failed to process payment:', error);
            alert('Payment processing failed');
        }
    };

    const handleCashInput = (amount: number) => {
        const newCashReceived = cashReceived + amount;
        setCashReceived(newCashReceived);
        setChange(newCashReceived - (totalAmount || 0));
    };

    const handleCustomAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(event.target.value);
        setCashReceived(value);
        setChange(value - (totalAmount || 0));
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                    
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-bold">₱{totalAmount?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cash Received:</span>
                            <span className="font-bold">₱{cashReceived.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span>Change:</span>
                            <span className="font-bold text-green-600">
                                ₱{Math.max(0, change).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Custom Amount
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">₱</span>
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={cashReceived || ''}
                                onChange={handleCustomAmount}
                                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md 
                                    focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {[100, 200, 500, 1000].map((amount) => (
                            <button
                                key={amount}
                                onClick={() => handleCashInput(amount)}
                                className="p-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                            >
                                + ₱{amount}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={!cashReceived || cashReceived < (totalAmount || 0)}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Complete Payment
                    </button>
                </div>
            </div>
        </div>
    );
}