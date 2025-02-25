import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import apiURL from '../axios';
import { DashboardStats, DashboardUser } from '../types';
import Cards from '../components/Cards';
import CreateOrderBtn from '../components/CreateOrderBtn';
// import Loading from '../components/loading';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<DashboardUser | null>(null);
    const [stats, setStats] = useState<DashboardStats>({
        totalOrders: 0,
        totalPendings: 0,
        totalCompleted: 0
    })
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

        const fetchStats = async () => {
            try { 
                const response = await apiURL.get('/api/dashboard/stats')
                setStats(response.data)
            } catch (error) {
                console.error('Failed to fetch stats:', error)
            }
        }

        fetchUser();
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                <div className="flex  justify-between bg-white rounded-lg shadow p-6 mb-5">
                    <div>
                        <p className="text-gray-600">
                        Welcome <span className='font-bold'>{user?.name}</span>! Let's make them food!
                        </p>
                    </div>
                    
                    <CreateOrderBtn
                        route="/pos"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Cards 
                        title="Total Orders"
                        count={stats.totalOrders}
                        color="bg-blue-500"
                        route='/total/orders'
                    />
                    <Cards 
                        title="Reservations"
                        count={15}
                        color="bg-purple-500"
                        route="/reservations"
                    />
                    <Cards 
                        title="Completed Orders"
                        count={stats.totalCompleted}
                        color="bg-green-500"
                        route="/completed/orders"
                    />
                    <Cards 
                        title="Pending Orders"
                        count={stats.totalPendings}
                        color="bg-red-400"
                        route="/pending/orders"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;