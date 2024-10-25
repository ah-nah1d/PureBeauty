import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Component/Message';
import NavBar from '../Component/NavBar';
import Footer from '../Component/Footer';
import CheckoutSteps from '../Component/CheckoutSteps';
import { createOrder } from '../Actions/OrderAction';
import { ORDER_CREATE_RESET } from '../Constants/OrderConstants';

function PlaceOrderScreen() {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, error, success } = orderCreate;
    const dispatch = useDispatch();

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2);

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
        if (success) {
            navigate(`/order/${order.id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, navigate]);

    const placeOrder = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar />
            <div className="container mx-auto p-6 flex-grow">
                <CheckoutSteps step1 step2 step3 step4 />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    <div className="md:col-span-2">
                        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg mb-6">
                            <h2 className="text-2xl font-semibold mb-3">Shipping</h2>
                            <p className="text-gray-700">
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </div>

                        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg mb-6">
                            <h2 className="text-2xl font-semibold mb-3">Payment Method</h2>
                            <p className="text-gray-700">
                                <strong>Method: </strong> {cart.paymentMethod}
                            </p>
                        </div>

                        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">Your cart is empty</Message>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {cart.cartItems.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-4">
                                            <img src={`http://localhost:8000${item.image}`} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                            <Link to={`/product/${item.product}`} className="ml-4 text-lg text-blue-600 hover:underline font-medium">
                                                {item.name}
                                            </Link>
                                            <div className="ml-auto text-lg font-semibold">
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Items:</span>
                                <span className="text-gray-900 font-medium">${cart.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="text-gray-900 font-medium">${cart.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total:</span>
                                <span>${cart.totalPrice}</span>
                            </div>
                            {error && <Message variant="danger">{error}</Message>}
                            <button
                                type="button"
                                className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrder}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PlaceOrderScreen;
