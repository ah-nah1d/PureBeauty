import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaSignOutAlt } from "react-icons/fa";

import { logout } from '../Actions/UserActions';
import ScrollLink from './ScrollLink';

function UserSideBar({ menuItems }) {
    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const activeItem = menuItems.find(item => location.pathname.includes(item.route));
        setActiveMenuItem(activeItem ? activeItem.label.toLowerCase() : '');
    }, [location, menuItems]);

    return (
        <div className="hidden md:flex top-0 left-0 h-full bg-white text-black flex-col pl-2"> 
            <ScrollLink to='/' className="flex items-center justify-center text-xl font-bold p-4 h-1/5">PureBeauty</ScrollLink>
            <ul className="flex flex-col mt-4 space-y-2">
                {menuItems.map(({ label, route, icon: Icon }) => {
                    const isActive = activeMenuItem === label.toLowerCase();
                    return (
                        <li key={label} className="relative rounded-sm">
                            {isActive && (
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-1 bg-blue-500" />
                            )}
                            <ScrollLink
                                to={route}
                                className={`block items-center gap-2 p-4 flex cursor-pointer rounded-r-full ${isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-300 hover:text-black'}`}
                            >
                                <Icon /> {label}
                            </ScrollLink>
                        </li>
                    );
                })}
            </ul>
            <div className="flex items-end p-4 h-1/4">
                <button onClick={logoutHandler} className="flex items-center flex-row gap-2">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
    );
}

export default UserSideBar;
