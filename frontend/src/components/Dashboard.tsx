import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import apiURL from '../axios';
import { DashboardUser } from '../types';

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
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Welcome {user?.email}! Here you can find various data displays and UI elements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;