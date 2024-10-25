import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { FaShoppingCart, FaUser, FaUserShield,FaChevronDown } from 'react-icons/fa';

import Search from './Search'

import { logout } from '../Actions/UserActions'
import ScrollLink from './ScrollLink'

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
        <nav className="text-black shadow-md px-20">
            <div className="flex p-4">
                <ScrollLink to='/' className="flex-1 text-xl font-bold">PureBeauty</ScrollLink>
                <div className="flex-1 flex justify-center"><Search /></div>
                <div className="flex-1 flex justify-end space-x-4 items-center">
                    <ScrollLink to='/cart' className="flex items-center">
                        <FaShoppingCart /> <span className="ml-1">Cart</span>
                    </ScrollLink>
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
                                <ScrollLink
                                to="/profile"
                                className="block px-4 py-2 shadow text-gray-800 hover:bg-gray-100"
                                >
                                Profile
                                </ScrollLink>
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
                        <ScrollLink to="/login" className="flex items-center">
                            <FaUser /> <span className="ml-1">Login</span>
                        </ScrollLink>
                    )}
                    {userInfo && userInfo.isAdmin && (
                        <ScrollLink to="/admin" className="flex items-center">
                        <FaUserShield /> <span className="ml-1">Admin</span>
                        </ScrollLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

<>
                        <div className='text-3xl'>New Collection This week</div>
                        <div className='text-sm text-slate-500 py-3'>Look out for this season's exclusives and new addition pieces you'll love throughout the coming seasons.</div>
                        <button> View All Collections</button>
                    </>