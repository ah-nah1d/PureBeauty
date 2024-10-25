import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../Component/CheckoutSteps';
import NavBar from '../Component/NavBar'
import Footer from '../Component/Footer'
import { savePaymentMethod } from '../Actions/CartActions';

function Payment() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className='flex flex-col'>
            <NavBar />
            <div className="max-w-lg min-h-screen mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-10">
                <CheckoutSteps step1 step2 step3 />
                <h2 className="text-2xl font-bold text-center mb-6">Select Payment Method</h2>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Payment Method
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="radio"
                                id="paypal"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                            />
                            <label htmlFor="paypal" className="text-gray-700 text-lg">
                                Cash On Delivery
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-200"
                    >
                        Continue
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;
