import React from 'react';
import { FaShoppingCart, FaUser, FaUserShield } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Search from './Search'


function NavBar() {

    return (
        <nav className="text-black">
        <div className="hidden md:flex flex-col px-4 py-2 ">
            <div className="flex p-2">
                <div className="flex-1 text-xl font-bold">PureBeauty</div>
                <div className="flex-1 flex justify-center"><Search /></div>
                <div className="flex-1 flex justify-end space-x-4 items-center">
                    <div className="flex items-center">
                        <FaShoppingCart /> <span className="ml-1">Cart</span>
                    </div>
                    <Link to="/login" className="flex items-center">
                        <FaUser /> <span className="ml-1">Login</span>
                    </Link>
                    
                    <Link to="/admin" className="flex items-center">
                        <FaUserShield /> <span className="ml-1">Admin</span>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center">
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">Men</a>
                <a href="#" className="hover:text-gray-400">Women</a>
                <a href="#" className="hover:text-gray-400">Child</a>
            </div>
            </div>
        </div>
        </nav>
    );
}

export default NavBar;
