import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';
import './App.css'
import apiURL from './axios';
import { AuthProvider } from './context/AuthContext';
import Loading from './components/Loading';
import CreateOrder from './components/Order/CreateOrder';
import Pos from './Pages/Pos';
import AddItems from './components/ManageItems/AddItems';
import AllItems from './components/ManageItems/AllItems';
import EditItem from './components/ManageItems/EditItem';
import PaymentConfirmation from './components/Order/PaymentConfirmation';
import CompletedOrder from './components/Order/CompletedOrder';
import AllUsers from './components/Users/AllUsers';
import AddUsers from './components/Users/AddUsers';

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
          <Route path="/create/order" element={<CreateOrder />} /> {/* Need to double check for removal, creating order was on Pos already */}
          <Route path="/pos" element={<Pos />} />
          <Route path="/all/items" element={<AllItems />} />
          <Route path="/add/items" element={<AddItems />} />
          <Route path="/edit/item/:id" element={<EditItem />} />
          <Route path="/payment-confirmation/:orderId" element={<PrivateRoute element={<PaymentConfirmation />} />} />
          <Route path="/completed/order" element={<CompletedOrder />} />
          <Route path="/all/users" element={<AllUsers />} />
          <Route path="/add/users" element={<AddUsers />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
