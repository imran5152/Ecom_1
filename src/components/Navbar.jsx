import React, { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        let userData = JSON.parse(savedUser);
        
        // Fix user data
        if (!userData.role) {
          if (userData.email === "ik9431151@gmail.com" || 
              userData._id === "68d8fd30a344860ef100f9d6" || 
              userData.id === "68d8fd30a344860ef100f9d6") {
            userData.role = "admin";
          } else {
            userData.role = "user";
          }
        }
        
        if (userData.id && !userData._id) {
          userData._id = userData.id;
        }
        
        setUser(userData);
      } catch (error) {
        console.error("Error loading user data");
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <img
            src="https://static7.depositphotos.com/1238677/791/i/950/depositphotos_7917154-stock-photo-e-commerce-3d-icon-isolated.jpg"
            alt="ShopEase Logo"
            className="w-10 h-10 rounded-lg"
          />
          <span className="font-bold text-xl text-gray-800 hidden sm:block">
            ShopEase
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex flex-grow max-w-2xl mx-8">
          <div className="flex items-center w-full bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-700 items-center">
          <Link to="/home">
            <li className="hover:text-blue-600 cursor-pointer transition duration-200">Home</li>
          </Link>
          <Link to="/products">
            <li className="hover:text-blue-600 cursor-pointer transition duration-200">Products</li>
          </Link>
          <Link to="/category">
            <li className="hover:text-blue-600 cursor-pointer transition duration-200">Categories</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-blue-600 cursor-pointer transition duration-200">About</li>
          </Link>

          {/* Admin Dashboard - Clean Professional Style */}
          {user?.role === "admin" && (
            <Link to="/admin/dashboard">
              <li className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 font-medium shadow-md">
                Admin Dashboard
              </li>
            </Link>
          )}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-gray-600">
          {/* Cart */}
          <div className="relative cursor-pointer group">
            <FaShoppingCart className="text-xl group-hover:text-blue-600 transition duration-200" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle className="text-2xl group-hover:text-blue-600 transition duration-200" />
              {user && (
                <span className="hidden lg:block text-sm font-medium text-gray-700">
                  Hi, {user.name}
                </span>
              )}
            </div>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.role === "admin" && (
                        <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          Administrator
                        </span>
                      )}
                      {user.role === "user" && (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          Customer
                        </span>
                      )}
                    </div>
                    
                    {/*  Ye links har logged-in user ke liye hain */}
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Orders
                    </Link>

                    {/*  Sirf admin ke liye */}
                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-3 text-blue-600 hover:bg-blue-50 transition duration-150 font-medium"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Jab koi user logged in nahi hai */}
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <Link 
              to="/home" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/category" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {user?.role === "admin" && (
              <Link 
                to="/admin/dashboard" 
                className="block py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {user ? (
              <>
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Signed in as {user.name}
                    {user.role === "admin" && " (Admin)"}
                    {user.role === "user" && " (Customer)"}
                  </div>
                  <Link 
                    to="/profile" 
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user.role === "admin" && (
                    <Link 
                      to="/admin/dashboard" 
                      className="block py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-150 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 mt-3 pt-3">
                <Link 
                  to="/login" 
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;