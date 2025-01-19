import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css'
import apiURL from './axios';
import { AuthProvider } from './context/AuthContext';
import Loading from './components/loading';
import CreateOrder from './components/Order/CreateOrder';

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiURL.get('/sanctum/csrf-cookie');

        await apiURL.get('/api/user');
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

    if (loading) {
        return <div>
            <Loading />
        </div>;
    }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/create/order" element={<CreateOrder />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
