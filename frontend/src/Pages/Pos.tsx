import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import apiURL from '../axios';
import { DashboardUser } from '../types';
import Cards from '../components/Cards';
import CreateOrderBtn from '../components/CreateOrderBtn';
import Items from '../components/Items';
// import Loading from '../components/loading';

const Pos: React.FC = () => {
    const [user, setUser] = useState<DashboardUser | null>(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiURL.get('/api/user');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">POS</h2>
                <div className="flex  justify-between bg-white rounded-lg shadow p-6 mb-5">
                    <div>
                        <p className="text-gray-600">
                        Welcome <span className='font-bold'>{user?.name}</span>! Let's make them food!
                        </p>
                    </div>
                    
                    <CreateOrderBtn
                        route="/create/order"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                    <Cards 
                        title="Starter"
                        color="bg-blue-500"
                        route='/total/orders'
                    />
                    <Cards 
                        title="Main Course"
                        color="bg-purple-500"
                        route="/reservations"
                    />
                    <Cards 
                        title="Drinks"
                        color="bg-green-500"
                        route="/completed/orders"
                    />
                    <Cards 
                        title="Dessert"
                        color="bg-red-400"
                        route="/pending/orders"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Items id={1} name="Item 1" price={10} />
                    <Items id={2} name="Item 2" price={20} />
                    <Items id={3} name="Item 3" price={30} />
                    <Items id={4} name="Item 4" price={40} />
                </div>
            </div>
        </div>
    );
};

export default Pos;