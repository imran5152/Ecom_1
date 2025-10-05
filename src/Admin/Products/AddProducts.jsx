import React, { useState } from 'react';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    brand: '',
    stock: '',
    discount: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      setMessage('Please fill all required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        image: formData.image.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        brand: formData.brand.trim(),
        stock: parseInt(formData.stock) || 0,
        discount: formData.discount ? parseInt(formData.discount) : 0
      };

      console.log('📦 Sending product data:', productData);

      const response = await fetch('https://back-eccom-2.onrender.com/product/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const responseData = await response.json();
      
      if (response.ok) {
        console.log('✅ Product created successfully:', responseData);
        setMessage('success::Product added successfully!');
        resetForm();
      } else {
        console.error('❌ Server error:', responseData);
        throw new Error(responseData.message || 'Failed to create product');
      }

    } catch (error) {
      console.error('❌ Error:', error);
      setMessage('error::' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
      brand: '',
      stock: '',
      discount: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Professional Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-4">
            Add New Product
          </h1>
          <p className="text-gray-600 text-xl font-light">Expand your inventory with premium products</p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-8 p-6 rounded-2xl border-l-4 ${
            message.startsWith('success') 
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
              : 'bg-rose-50 border-rose-400 text-rose-800'
          } shadow-sm`}>
            <div className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.startsWith('success') ? 'bg-emerald-100' : 'bg-rose-100'
              }`}>
                <span className={`text-lg ${
                  message.startsWith('success') ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {message.startsWith('success') ? '✓' : '✗'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {message.startsWith('success') ? 'Success!' : 'Error'}
                </p>
                <p className="text-sm opacity-90">
                  {message.split('::')[1]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Professional Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Product Details</h2>
                <p className="text-blue-100 text-sm">Complete all required fields to add new product</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Basic Information Section */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Product Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    Product Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700"
                    placeholder="Product Name"
                  />
                </div>

                {/* Price */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    Price
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full px-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700"
                      placeholder="price"
                      min="0"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700"
                    placeholder="category"
                  />
                </div>

                {/* Brand */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700"
                    placeholder="Brand"
                  />
                </div>

              </div>
            </div>

            {/* Inventory & Media Section */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Inventory & Media
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Stock Quantity */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700"
                    placeholder="Available units in inventory"
                    min="0"
                  />
                </div>

                {/* Discount */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Discount Percentage
                  </label>
                  <div className="relative">
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700"
                      placeholder="Special offer discount"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="lg:col-span-2 space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Product Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700"
                    placeholder="https://assets.example.com/products/samsung-galaxy-s24-ultra.jpg"
                  />
                </div>

              </div>
            </div>

            {/* Description Section */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Product Description
              </h3>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400 text-gray-700 resize-none"
                  placeholder="Describe your product features, specifications, and key benefits. Include technical details, usage instructions, and unique selling points..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <span className="text-red-500">*</span> indicates required fields
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2 min-w-[140px] justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear All</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2 min-w-[160px] justify-center shadow-lg shadow-blue-500/25"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Adding Product...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="text-blue-600 mr-3">💡</span>
              Product Guidelines
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Use clear, high-quality product images (min. 1200×800 px)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Write detailed descriptions with key features and specifications</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Set appropriate stock levels to avoid overselling</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Use specific categories for better product organization</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="text-purple-600 mr-3">🚀</span>
              Quick Examples
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Category:</strong> Smartphones, Laptops, Fashion, Home Appliances</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Brand:</strong> Apple, Samsung, Nike, Adidas, Sony</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Price:</strong> Competitive market pricing with discount options</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500 mt-1">•</span>
                <span><strong>Stock:</strong> Maintain optimal inventory levels</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddProduct;