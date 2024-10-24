import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShippingFast, FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

import UserSideBar from '../../Component/UserSidebar';
import { USER_UPDATE_PROFILE_RESET } from '../../Constants/UserConstants';
import { getUserDetails, updateUserProfile } from '../../Actions/UserActions';

const menuItems = [
    { label: 'Profile', route: '/profile', icon: FaUser },
    { label: 'Password', route: '/password', icon: RiLockPasswordLine },
    { label: 'Shipping Address', route: '/shipping-address', icon: FaShippingFast },
];

function Password() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const handleUpdate = async (e) => {
        e.preventDefault();
        const name = ''; 
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const result = await dispatch(updateUserProfile({ name, password, oldPassword }));
            setPassword('');
            setConfirmPassword('');
            setOldPassword('');

            if (result && result.success) {
                setMessage('Password updated successfully');
            } else {
                setMessage('Old password does not match');
            }
        } catch (error) {
            const errorMessage = error.response?.data.detail || 'An error occurred while updating the password';
            setMessage(errorMessage);
        }
    };

    const handleCancel = () => {
        setPassword('');
        setConfirmPassword('');
        setOldPassword('');
        navigate('/profile'); 

    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success || userInfo.id !== user.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
            }
        }
    }, [dispatch, success, navigate, userInfo, user]);

    return (
        <div className="flex">
            <UserSideBar menuItems={menuItems} />
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-4">Update Password</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        {message && (
                            <div className={`p-2 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="flex items-center">
                                <label className="block w-40 text-gray-700 p-2">New Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full border w-96 p-2 border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="block w-40 text-gray-700 p-2">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full border w-96 p-2 border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="block w-40 text-gray-700 p-2">Old Password:</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="mt-1 block w-full border w-96 p-2 border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type='submit'
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    type='button'
                                    onClick={handleCancel}
                                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Password;
