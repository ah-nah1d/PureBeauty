import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Component/Message';
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
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) ).toFixed(2);

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
        if (success) {
            navigate(`/order/${order._id}`);
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
        <div className="max-w-5xl mx-auto p-6">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow mb-4">
                        <h2 className="text-xl font-bold mb-2">Shipping</h2>
                        <p className="text-gray-700">
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow mb-4">
                        <h2 className="text-xl font-bold mb-2">Payment Method</h2>
                        <p className="text-gray-700">
                            <strong>Method: </strong> {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message variant="info">Your cart is empty</Message>
                        ) : (
                            <div className="space-y-4">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center border-b pb-2">
                                        <img src={`http://localhost:8000${item.image}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <Link to={`/product/${item.product}`} className="ml-4 text-blue-500 hover:underline">
                                            {item.name}
                                        </Link>
                                        <div className="ml-auto">
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-4 border border-gray-300 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Items:</span>
                            <span>${cart.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>${cart.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${cart.totalPrice}</span>
                        </div>
                        {error && <Message variant="danger">{error}</Message>}
                        <button
                            type="button"
                            className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                            disabled={cart.cartItems.length === 0}
                            onClick={placeOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrderScreen;
