import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Component/Message';
import Loader from '../Component/Loader';
import NavBar from '../Component/NavBar';
import Footer from '../Component/Footer'
import { getOrderDetails, deliverOrder } from '../Actions/OrderAction';
import { ORDER_DELIVER_RESET } from '../Constants/OrderConstants';

function Order() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        if (!order || order.id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, order, id, successDeliver]);

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div className='flex flex-col'>
            <NavBar/>
            <div className="container mx-auto my-8 p-4">
                <h1 className="text-3xl font-bold mb-6">Order: {order.id}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`} className="text-blue-500 hover:underline">{order.user.email}</a></p>
                            <p>
                                <strong>Shipping:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                            <p>
                                <strong>Method:</strong> {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant='info'>Order is empty</Message>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {order.orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between py-2">
                                            <div className="flex items-center">
                                                <img src={`http://localhost:8000${item.image}/`} alt={item.name} className="h-16 w-16 rounded" />
                                                <Link to={`/product/${item.product}`} className="ml-4 text-blue-500 hover:underline">{item.name}</Link>
                                            </div>
                                            <div>
                                                {item.qty} X ${item.price} = ${((item.qty * item.price).toFixed(2))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Item:</span>
                                <span>${order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping:</span>
                                <span>${order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax:</span>
                                <span>${order.taxPrice}</span>
                            </div>
                            <div className="flex justify-between mb-2 font-bold">
                                <span>Total:</span>
                                <span>${order.totalPrice}</span>
                            </div>
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <div className="mt-4">
                                    <button
                                        type='button'
                                        className='w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700'
                                        onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Order;
