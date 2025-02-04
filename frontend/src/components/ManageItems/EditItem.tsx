import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiURL from '../../axios';
import { Category, MenuItem } from '../../types';
import Navbar from '../Navbar';
import Loading from '../Loading';

export default function EditItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<MenuItem>({
        id: 0,
        name: '',
        category: '',
        price: 0,
        status: 'active'
    });

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const response = await apiURL.get<MenuItem>(`/api/items/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Failed to fetch item:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    useEffect(() => {
        const categories = async () => {
            try {
                const response = await apiURL.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            };

        };
            categories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiURL.put(`/api/items/${id}`, formData);
            navigate('/all/items');
        } catch (error) {
            console.error('Failed to update item:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 mt-8">
                <h2 className="text-2xl font-bold mb-6">Edit Menu Item</h2>
                <form onSubmit={handleSubmit} className="max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Update Item
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/manage/items')}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
