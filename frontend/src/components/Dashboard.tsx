import React from 'react';
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Welcome to the dashboard! Here you can find various data displays and UI elements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;