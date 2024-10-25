import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../Component/CheckoutSteps';
import NavBar from '../Component/NavBar'
import Footer from '../Component/Footer'
import { saveShippingAddress } from '../Actions/CartActions';

function Shipping() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    console.log(cart)

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [division, setDivision] = useState(shippingAddress.country);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, division }));
        navigate('/payment');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex justify-center items-center  w-screen h-full bg-gradient-to-r">
                <div className="w-full max-w-lg p-8 bg-white m-2 rounded-lg shadow-lg ">
                    <CheckoutSteps step1 step2 />
                    <h1 className="text-3xl  font-semibold text-center text-gray-800 mb-6">Shipping Address</h1>
                    <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                            <label htmlFor="division" className="block mb-1 font-semibold text-gray-700">Division</label>
                            <select
                                required
                                value={division}
                                onChange={(e) => setDivision(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                <option value="" disabled>Select Division</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Barishal">Barishal</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Mymensingh">Mymensingh</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-1 font-semibold text-gray-700">Address</label>
                            <input
                                required
                                type="text"
                                placeholder="Enter Address"
                                value={address || ''}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block mb-1 font-semibold text-gray-700">Area</label>
                            <input
                                required
                                type="text"
                                placeholder="Enter Area"
                                value={city || ''}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block mb-1 font-semibold text-gray-700">Postal Code</label>
                            <input
                                required
                                type="text"
                                placeholder="Enter Postal Code"
                                value={postalCode || ''}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <button type="submit" className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-200">
                            Continue
                        </button>
                    </form> 
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Shipping;
