import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'shirts',
    price: '',
    originalPrice: '',
    image: '',
    badge: '',
    sizes: ''
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      sizes: formData.sizes.split(',').map(s => s.trim())
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productData);
      } else {
        await api.post('/products', productData);
      }
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'shirts',
        price: '',
        originalPrice: '',
        image: '',
        badge: '',
        sizes: ''
      });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      badge: product.badge || '',
      sizes: product.sizes.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'shirts',
      price: '',
      originalPrice: '',
      image: '',
      badge: '',
      sizes: ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-accent text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-accent/90 transition-all shadow-lg"
          >
            Add New Product
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">Loading products...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No products found. Add your first product!</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                            <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">Sizes: {product.sizes.join(', ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap uppercase text-xs font-medium text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-accent">₹{product.price}</div>
                        <div className="text-xs text-gray-400 line-through">₹{product.originalPrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.badge && (
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                            product.badge === 'Bestseller' ? 'bg-orange-500' :
                            product.badge === 'Premium' ? 'bg-violet-500' :
                            product.badge === 'New' ? 'bg-emerald-500' :
                            product.badge === 'Sale' ? 'bg-red-500' : 'bg-accent'
                          }`}>
                            {product.badge}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-accent hover:text-accent/70 mr-4 transition-colors font-bold uppercase text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800 transition-colors font-bold uppercase text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[500] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-8 pt-8 pb-6">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                        placeholder="e.g. Classic White Shirt"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                        >
                          <option value="shirts">Shirts</option>
                          <option value="tshirts">T-Shirts</option>
                          <option value="jeans">Jeans</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tag (Badge)</label>
                        <select
                          name="badge"
                          value={formData.badge}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                        >
                          <option value="">No Tag</option>
                          <option value="Bestseller">Bestseller</option>
                          <option value="Premium">Premium</option>
                          <option value="New">New</option>
                          <option value="Sale">Sale</option>
                          <option value="Trending">Trending</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                          type="number"
                          name="price"
                          required
                          value={formData.price}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                          placeholder="650"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                        <input
                          type="number"
                          name="originalPrice"
                          required
                          value={formData.originalPrice}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                          placeholder="1500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                        placeholder="e.g. /Shirts/product.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
                      <input
                        type="text"
                        name="sizes"
                        required
                        value={formData.sizes}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                        placeholder="e.g. S, M, L, XL"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-8 py-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-3 bg-accent text-base font-bold uppercase tracking-widest text-white hover:bg-accent/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
