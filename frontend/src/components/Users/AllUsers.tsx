import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import apiURL from '../../axios';
import { FetchUserData } from '../../types';
import Loading from '../Loading';

export default function AllUsers() {
    const [users, setUsers] = useState<FetchUserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<FetchUserData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        const userFetch = async () => {
            try {
                const response = await apiURL.get<FetchUserData[]>('/api/users');
                console.log("users", response.data)
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        userFetch();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        setLoading(true);

        try {
            await apiURL.delete(`/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        } finally {
            setLoading(false);
        }

        if (loading) {
            return <div>
                <Loading />
            </div>;
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredUsers(filtered);
    }

    const filterusersByRole = (roleValue: string) => {
        setSelectedUser(roleValue);
        let filtered = [...users];
        
        if (roleValue !== '') {
            filtered = filtered.filter(user => user.role === roleValue);
        }

        if (searchQuery) {
            filtered = filtered.filter(user => 
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setFilteredUsers(filtered);
    };

    return (
        <div>
          <Navbar />
            {/* Header */}
            <div className='mt-8 container mx-auto px-4'>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
                    <Link to="/add/users"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                            transition-colors flex items-center space-x-2">
                        <span>Add User</span>
                    </Link>
                        
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                        focus:ring-blue-500 focus:border-transparent"
                    />
                    </div>
                    <select 
                        value={selectedUser}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
                        onChange={(e) => filterusersByRole(e.target.value)}
                    >
                        <option value="">All Role</option>
                        <option value="hot-dishes">Admin</option>
                        <option value="cold-dishes">Chef</option>
                        <option value="soup">Cashier</option>
                        <option value="grill">Waiter</option>
                    </select>
                </div>

                {/* user Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-y border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {(searchQuery ? filteredUsers : users).map((user) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.role}
                                    </td>
                                    <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                        <Link to={`/edit/user/${user.id}`} className="text-blue-600 hover:text-blue-900">
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(user.id)} 
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}