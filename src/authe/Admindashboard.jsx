// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign, 
  FaBox, 
  FaChartLine,
  FaCog,
  FaUserShield,
  FaStore
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

     
      if (parsedUser.role !== "admin") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);


  const [stats] = useState({
    totalUsers: 1247,
    totalOrders: 356,
    totalRevenue: 45280,
    totalProducts: 89,
    monthlyGrowth: "+12.5%",
    pendingOrders: 23
  });


  const [recentActivities] = useState([
    { id: 1, action: "New order placed", user: "John Doe", time: "2 mins ago" },
    { id: 2, action: "User registered", user: "Sarah Smith", time: "10 mins ago" },
    { id: 3, action: "Product added", user: "Admin", time: "1 hour ago" },
    { id: 4, action: "Order completed", user: "Mike Johnson", time: "2 hours ago" }
  ]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name} 👋</p>
            </div>
            <div className="text-sm text-gray-500">
              Last login: Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2"></p>
                <p className="text-sm text-green-600 mt-1">growth</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders.toLocaleString()}</p>
                <p className="text-sm text-red-600 mt-1">{stats.pendingOrders} pending</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaShoppingCart className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

       
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+8.2% this month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaDollarSign className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Products Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
                <p className="text-sm text-gray-600 mt-1">Active in store</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <FaBox className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/admin/users")}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                    <FaUserShield className="text-xl text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Manage Users</h3>
                    <p className="text-sm text-gray-600">View and manage all users</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/admin/orders")}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
                >
                  <div className="bg-green-100 p-3 ro   unded-lg mr-4 group-hover:bg-green-200 transition-colors">
                    <FaShoppingCart className="text-xl text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Manage Orders</h3>
                    <p className="text-sm text-gray-600">Process and track orders</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/admin/productmanagement")}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors group"
                >
                  <div className="bg-orange-100 p-3 rounded-lg mr-4 group-hover:bg-orange-200 transition-colors">
                    <FaBox className="text-xl text-orange-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Manage Products</h3>
                    <p className="text-sm text-gray-600">Add or edit products</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/admin/analytics")}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
                >
                  <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                    <FaChartLine className="text-xl text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-600">View sales analytics</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="bg-gray-100 p-2 rounded-lg mt-1">
                    <FaStore className="text-gray-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Active Sessions</p>
                <p className="text-2xl font-bold mt-1">247</p>
              </div>
              <FaUsers className="text-2xl text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Conversion Rate</p>
                <p className="text-2xl font-bold mt-1">3.2%</p>
              </div>
              <FaChartLine className="text-2xl text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg. Order Value</p>
                <p className="text-2xl font-bold mt-1">$127</p>
              </div>
              <FaDollarSign className="text-2xl text-purple-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;