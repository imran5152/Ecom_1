import React, { useState, useEffect } from 'react';

function ListProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://back-eccom-2.onrender.com/product');
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(`Failed to load products: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product function
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      setDeleteLoading(productId);
      const response = await fetch(`https://back-eccom-2.onrender.com/product/delete/${productId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchProducts();
        alert('Product deleted successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
      console.error('Delete error:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

 
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await fetch(`https://back-eccom-2.onrender.com/product/update/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        await fetchProducts();
        setShowEditModal(false);
        setEditingProduct(null);
        alert('Product updated successfully!');
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      alert('Failed to update product');
      console.error('Update error:', err);
    }
  };

  const handleInputChange = (field, value) => {
    setEditingProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Categories extraction
  const categories = ['All Categories'];
  if (products && products.length > 0) {
    const uniqueCategories = [...new Set(products.map(p => {
      return p.category && p.category.name ? p.category.name : p.category;
    }).filter(Boolean))];
    categories.push(...uniqueCategories);
  }

  // Filter products based on search and category
  const filteredProducts = products ? products.filter(product => {
    const productCategory = product.category && product.category.name ? product.category.name : product.category;
    
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                           productCategory === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) : [];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Product Catalog</h2>
            <p className="text-gray-600 text-lg">
              Manage your product inventory efficiently
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 w-full lg:w-96 transition-all duration-300 shadow-sm"
              />
              <span className="absolute right-4 top-4 text-gray-500 text-lg">
                🔍
              </span>
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">In Stock</p>
                <p className="text-2xl font-bold text-gray-800">
                  {products.filter(p => p.stock > 10).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Low Stock</p>
                <p className="text-2xl font-bold text-gray-800">
                  {products.filter(p => p.stock > 0 && p.stock <= 10).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">❌</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-800">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-red-500 text-2xl mr-4">⚠️</span>
                <div>
                  <h3 className="text-red-800 font-semibold text-lg">Error Loading Products</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
              <button 
                onClick={fetchProducts}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold shadow-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const productCategory = product.category && product.category.name ? product.category.name : product.category;
            const productId = product._id || product.id;
            const isDeleting = deleteLoading === productId;
            
            return (
              <div key={productId} className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                {/* Product Image/Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-2xl text-white">
                        {product.emoji || '📦'}
                      </span>
                    )}
                  </div>
                  <span className={`${
                    product.stock > 10 ? 'bg-green-100 text-green-800 border border-green-200' : 
                    product.stock === 0 ? 'bg-red-100 text-red-800 border border-red-200' : 
                    'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  } text-xs font-bold px-3 py-2 rounded-full capitalize shadow-sm`}>
                    {product.stock > 10 ? 'In Stock' : product.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                  </span>
                </div>
                
                {/* Product Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Price and Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{product.price?.toLocaleString()}
                  </span>
                  <span className="text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium capitalize border">
                    {productCategory || 'Uncategorized'}
                  </span>
                </div>
                
                {/* Stock and SKU */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                  <span className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Stock: {product.stock} units
                  </span>
                  <span className="font-mono bg-gray-50 px-3 py-2 rounded-lg text-xs border">
                    {product.sku || 'N/A'}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleEdit(product)}
                    disabled={isDeleting}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <span>✏️</span>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(productId)}
                    disabled={isDeleting}
                    className="flex-1 bg-gradient-to-r from-red-50 to-red-100 text-red-600 py-3 rounded-xl font-semibold hover:from-red-100 hover:to-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 border border-red-200 hover:border-red-300 shadow-sm"
                  >
                    {isDeleting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <span>🗑️</span>
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-5xl">📦</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No products found</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'All Categories' 
                ? `No products match "${searchTerm}" in ${selectedCategory}. Try different search terms or categories.`
                : 'No products available in your catalog.'}
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All Categories'); }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear Filters
              </button>
              <button 
                onClick={fetchProducts}
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditModal && editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 scale-100">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white rounded-t-3xl">
                <h3 className="text-2xl font-bold text-gray-800">Edit Product</h3>
                <p className="text-gray-600 mt-1">Update product details</p>
              </div>
              
              <form onSubmit={handleUpdateProduct} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                  <textarea
                    value={editingProduct.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Price (₹)</label>
                    <input
                      type="number"
                      value={editingProduct.price || ''}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock || ''}
                      onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListProducts;