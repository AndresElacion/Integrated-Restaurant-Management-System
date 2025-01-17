import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import apiURL from '../axios';
import { DashboardUser } from '../types';
import Cards from './Cards';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<DashboardUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await apiURL.get('/api/user');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                <div className="bg-white rounded-lg shadow p-6 mb-5">
                    <p className="text-gray-600">
                        Welcome {user?.email}! Let's make them food!
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Cards 
                        title="Total Orders"
                        count={10}
                        color="bg-blue-500"
                    />
                    <Cards 
                        title="Reservations"
                        count={15}
                        color="bg-purple-500"
                    />
                    <Cards 
                        title="Completed Orders"
                        count={12}
                        color="bg-green-500"
                    />
                    <Cards 
                        title="Pending Orders"
                        count={5}
                        color="bg-red-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;