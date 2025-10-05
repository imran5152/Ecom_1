import React from 'react';
import { Link } from 'react-router-dom';

function ProductManagement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Product Manager
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage your inventory with ease
            </p>
            
            {/* Navigation Tabs */}
            <div className="inline-flex rounded-2xl bg-gray-100 p-2 shadow-inner">
              <Link 
                to="/admin/productlist" 
                className="flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-white text-blue-600 shadow-lg"
              >
                <span className="mr-3">📦</span>
                View Products
              </Link>
             
              <Link 
              
                to="/admin/products" 
                className="flex items-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 text-gray-600 hover:text-gray-800"
              >
                  <span className="mr-3">➕</span>
               
                Add Product
              </Link>
            </div>
          </div>
        </div>

       
        
      </div>
    </div>
  );
}

export default ProductManagement;