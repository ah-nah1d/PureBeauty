import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <nav className="flex justify-center mb-8 space-x-8">
        <div>
            {step1 ? (
            <Link
                to="/login"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition duration-200"
            >
                Login
            </Link>
            ) : (
            <span className="text-lg font-semibold text-gray-400 cursor-not-allowed">
                Login
            </span>
            )}
        </div>
        
        <div>
            {step2 ? (
            <Link
                to="/shipping"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition duration-200"
            >
                Shipping
            </Link>
            ) : (
            <span className="text-lg font-semibold text-gray-400 cursor-not-allowed">
                Shipping
            </span>
            )}
        </div>
        
        <div>
            {step3 ? (
            <Link
                to="/payment"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition duration-200"
            >
                Payment
            </Link>
            ) : (
            <span className="text-lg font-semibold text-gray-400 cursor-not-allowed">
                Payment
            </span>
            )}
        </div>
        
        <div>
            {step4 ? (
            <Link
                to="/placeorder"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition duration-200"
            >
                Place Order
            </Link>
            ) : (
            <span className="text-lg font-semibold text-gray-400 cursor-not-allowed">
                Place Order
            </span>
            )}
        </div>
        </nav>
    );
}

export default CheckoutSteps;
