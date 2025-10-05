import React from 'react';

function ListProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Product Catalog</h2>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
          />
          <select className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Wearables</option>
            <option>Computers</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Card 1 */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xl text-blue-600">🎧</span>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
              IN STOCK
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">Wireless Headphones</h3>
          <p className="text-gray-600 text-sm mb-4">High-quality wireless headphones with noise cancellation</p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-blue-600">₹2,999</span>
              <span className="text-green-600 text-sm font-medium ml-2">• 10% OFF</span>
            </div>
            <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
              Electronics
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>Stock: 25 units</span>
            <span>Brand: Sony</span>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>Rating: 4.5 ★</span>
            <span>Reviews: 120</span>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Edit
            </button>
            <button className="flex-1 bg-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-200 transition-colors">
              Delete
            </button>
          </div>
        </div>

        {/* Product Card 2 */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xl text-green-600">⌚</span>
            </div>
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
              LOW STOCK
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Watch Pro</h3>
          <p className="text-gray-600 text-sm mb-4">Feature-rich smartwatch with health monitoring</p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-green-600">₹4,999</span>
              <span className="text-green-600 text-sm font-medium ml-2">• 5% OFF</span>
            </div>
            <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
              Wearables
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>Stock: 15 units</span>
            <span>Brand: Apple</span>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>Rating: 4.2 ★</span>
            <span>Reviews: 89</span>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Edit
            </button>
            <button className="flex-1 bg-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-200 transition-colors">
              Delete
            </button>
          </div>
        </div>

        {/* Product Card 3 */}
        <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xl text-red-600">💻</span>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
              OUT OF STOCK
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">Gaming Laptop</h3>
          <p className="text-gray-600 text-sm mb-4">High-performance gaming laptop for professionals</p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-red-600">₹89,999</span>
              <span className="text-green-600 text-sm font-medium ml-2">• 15% OFF</span>
            </div>
            <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
              Computers
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>Stock: 0 units</span>
            <span>Brand: Dell</span>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>Rating: 4.8 ★</span>
            <span>Reviews: 45</span>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Edit
            </button>
            <button className="flex-1 bg-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-200 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProducts;