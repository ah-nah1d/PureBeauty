import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import Message from '../../Component/Message';
import Footer from '../../Component/Footer'
import NavBar from '../../Component/NavBar'
import { addToCart,removeFromCart } from '../../Actions/CartActions'; 
import { IoMdTrash } from "react-icons/io";


function Cart() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect') || '/shipping';
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const [qty, setQty] = useState(() => Number(new URLSearchParams(location.search).get('qty')) || 1);


    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, Number(qty)));
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate(`/login?redirect=/shipping`);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex h-screen flex-col md:flex-row"style={{ transform: 'scale(0.90)' }}>
                <div className="w-full  p-4">
                    <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-6 ">
                        <p className="text-lg font-semibold text-gray-700 mb-4">Your cart is empty</p>
                        <Link to='/' className="text-blue-500 underline hover:text-blue-600 transition duration-200">
                            Continue Shopping
                        </Link>
                    </div>
                    
                    ) : (
                        <div>
                            {cartItems.map(item => (
                                <div key={item.product} className="w-2/3 flex items-center justify-between mb-4 p-4 border rounded">
                                    <div className="flex items-center space-x-4">
                                        {console.log(item)}
                                        <img src={`http://localhost:8000${item.image}`} alt={item.name} className="w-16 h-16 rounded object-cover" />
                                        <Link
                                            to={`/product/${item.slug}`}
                                            state={{ id: item.product }}
                                            className="text-blue-500"
                                        >{item.name}</Link>
                                    </div>
                                    <div className="text-lg">${item.price}</div>
                                    <div className='flex gap-5'>
                                        <div className='w-24 flex justify-between items-center'>
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newQty = Math.max(qty - 1, 1);
                                                    setQty(newQty);
                                                    dispatch(addToCart(item.product, newQty));
                                                }}
                                                className="px-2 py-1 bg-gray-300 rounded-l"
                                            >
                                                -
                                            </button>
                                            
                                            <input
                                                type="text"
                                                value={qty}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                                    const numericValue = Math.min(value, item.countInStock);
                                                    const finalQty = numericValue > 0 ? numericValue : 1;
                                                    setQty(finalQty);
                                                    dispatch(addToCart(item.product, finalQty));
                                                }}
                                                className="border text-center w-10 px-2 py-1"
                                                style={{
                                                    appearance: 'none',
                                                    WebkitAppearance: 'none',
                                                    MozAppearance: 'textfield',
                                                    margin: 0,
                                                    outline: 'none',
                                                }}
                                                min="1"
                                                max={item.countInStock}
                                            />
                                            
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newQty = Math.min(qty + 1, item.countInStock);
                                                    setQty(newQty);
                                                    dispatch(addToCart(item.product, newQty));
                                                }}
                                                className="px-2 py-1 bg-gray-300 rounded-r"
                                            >
                                                +
                                            </button>
                                        </div>

                                        </div>
                                        <button
                                            type='button'
                                            className="text-red-500"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <IoMdTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="w-1/3 p-4 mt-10">
                    <div className="border rounded p-4 space-y-4">
                        <div>
                            <h2 className="text-xl mb-6 font-bold">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            <div className="text-lg">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</div>
                        </div>
                        <button
                            type='button'
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed to checkout
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
