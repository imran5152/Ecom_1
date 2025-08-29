import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full border-b border-gray-300 bg-inherit  border-l-indigo-950 px-4 py-3 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">


                <div className="w-full flex items-center gap-4">

                    <div className="flex items-center gap-2">
                        <img
                            src="https://static7.depositphotos.com/1238677/791/i/950/depositphotos_7917154-stock-photo-e-commerce-3d-icon-isolated.jpg"
                            alt="Logo"
                            className="w-[45px] h-[45px] object-cover rounded"
                        />
                        <span className="font-bold text-xl text-gray-800 hidden sm:block">
                            ShopEase
                        </span>
                    </div>


                    <div className="flex-grow flex items-center bg-gray-100 px-3 py-2 rounded-md border  bg-inherit border-gray-300 focus-within:ring-2 focus-within:ring-blue-400">
                        <FaSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className=" outline-none w-full text-sm bg-inherit"
                        />
                    </div>


                    <div className="hidden md:flex flex-grow" />



                </div>


                <ul className="hidden md:flex gap-6 font-medium text-gray-700">
                    <Link to="/home">  <li className="hover:text-blue-600 cursor-pointer">Home</li></Link>
                    <Link to="/about"><li className="hover:text-blue-600 cursor-pointer">About</li></Link>
                    <Link to="/products"> <li className="hover:text-blue-600 cursor-pointer">Products</li></Link>
                    <Link to="/category"><li className="hover:text-blue-600 cursor-pointer">Category</li></Link>
                </ul>


                {isOpen && (
                    <div className="md:hidden mt-3 bg-gray-50 rounded-md shadow-md p-4 space-y-4">
                        <ul className="flex flex-col gap-3 font-medium text-gray-700">
                            <Link to="/home">  <li className="hover:text-blue-600 cursor-pointer">Home</li></Link>
                            <Link to="/about"><li className="hover:text-blue-600 cursor-pointer">About</li></Link>
                            <Link to="/products"> <li className="hover:text-blue-600 cursor-pointer">Products</li></Link>
                            <Link to="/category"><li className="hover:text-blue-600 cursor-pointer">Category</li></Link>
                        </ul>
                    </div>

                )}
                <div className="flex">
                    <div className="flex items-center gap-4 text-gray-700 text-xl">
                        <FaUserCircle className="hover:text-blue-600 cursor-pointer" />
                        <FaShoppingCart className="hover:text-blue-600 cursor-pointer" />
                    </div>

                    <div className="md:hidden ml-[76%]">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                        </button>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
