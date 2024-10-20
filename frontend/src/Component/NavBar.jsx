import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { FaShoppingCart, FaUser, FaUserShield,FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Search from './Search'

import { logout } from '../Actions/UserActions'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const userLogin =useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const dispatch =useDispatch()

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logoutHandler=()=>{
        dispatch(logout())
    }

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
                    {userInfo?(
                        <div className="relative">
                            <button
                            title={userInfo.name}
                            id="username"
                            onClick={toggleDropdown}
                            className="text-black px-4 flex items-center"
                            >
                            {userInfo.name}
                            <FaChevronDown 
                                className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                            />
                            </button>
                    
                            {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                <a
                                href="/profile"
                                className="block px-4 py-2 shadow text-gray-800 hover:bg-gray-100"
                                >
                                Profile
                                </a>
                                <button
                                onClick={logoutHandler}
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                Logout
                                </button>
                            </div>
                            )}
                        </div>
                    ):(
                        <Link to="/login" className="flex items-center">
                            <FaUser /> <span className="ml-1">Login</span>
                        </Link>
                    )}
                    {userInfo && userInfo.isAdmin && (
                        <Link to="/admin" className="flex items-center">
                        <FaUserShield /> <span className="ml-1">Admin</span>
                        </Link>
                    )}
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
