import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShippingFast, FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

import UserSideBar from '../../Component/UserSidebar';
import {USER_UPDATE_PROFILE_RESET} from '../../Constants/UserConstants'

import { getUserDetails,updateUserProfile } from '../../Actions/UserActions';

const menuItems = [
    { label: 'Profile', route: '/profile', icon: FaUser },
    { label: 'Password', route: '/password', icon: RiLockPasswordLine },
    { label: 'Shipping Address', route: '/shipping-address', icon: FaShippingFast },
];

function Profile() {
    const [name,setName]=useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile =useSelector(state=>state.userUpdateProfile)
    const {success} =userUpdateProfile

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const handleUpdate = (e) => {
        e.preventDefault()
        const password=''
        const oldPassword=''
        dispatch(updateUserProfile({name,password,oldPassword}))
    };

    const handleCancel = () => {
        console.log('Canceled changes');
    };
    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if(!user || !user.name || success || userInfo.id !== user.id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
            }
        }
    }, [dispatch, success, navigate, userInfo, user]);

    return (
        <div className="flex">
            <UserSideBar menuItems={menuItems}/>
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4 flex items-center">
                            <label className="block w-20 text-gray-700 p-2">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className="mt-1 block w-full border w-96 p-2 border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="mb-4 flex items-center">
                            <label className="block w-20 text-gray-700 p-2">Email:</label>
                            <div className="mt-1 block w-full w-96 p-2">
                                {user.email}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
