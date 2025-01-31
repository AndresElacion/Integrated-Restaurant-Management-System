import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiURL from '../axios';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const signOut = async () => {
    try {
      await apiURL.post('logout', null, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg">My App</div>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-white hover:text-gray-300">Dashboard</Link>
              <Link to="#" className="text-white hover:text-gray-300">POS</Link>
              <Link to="#" className="text-white hover:text-gray-300">Kitchen</Link>
              <Link to="#" className="text-white hover:text-gray-300">Order</Link>
              <button onClick={signOut} className="text-white hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;