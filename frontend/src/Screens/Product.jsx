import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import NavBar from '../Component/NavBar';
import Rating from '../Component/Rating';
import Loader from '../Component/Loader';
import Message from '../Component/Message';
import ScrollLink from '../Component/ScrollLink';
import StarRating from '../Component/StarRating'
import { listProductDetails,createProductReview  } from '../Actions/ProductActions'; //
import { PRODUCT_CREATE_REVIEW_RESET } from '../Constants/ProductConstants';

function Product() {
    const [rating, setRating] = useState(0);
    const [qty, setQty] = useState(1);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { id } = location.state || {};

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(id));
    }, [dispatch, id, successProductReview]); 

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
        createProductReview(id, {
            rating,
            comment,
        })
        );
    };

    const imageUrl = `http://localhost:8000${product.image}`;

    return (
        <div>
            <NavBar/>
        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <div className='grid grid-cols-1 grid-cols-12 gap-6'style={{ transform: 'scale(0.80)',}}>
                <div className='col-span-4'>
                    <img src={imageUrl} alt={product.name} className='w-full h-auto rounded' />
                </div>
                <div className='col-span-5'>
                    <ul className='space-y-5'>
                    <li>
                        <h3 className='text-5xl font-bold'>{product.name}</h3>
                    </li>
                    <li>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews}reviews`}
                            color={'#f8e825'}
                            starSize="1.5rem"
                            textSize="1.5rem" 
                        />
                    </li>
                    <li className='text-xl'>Price: ${product.price}</li>
                    <li className='text-lg text-slate-500'>{product.description}</li>
                    </ul>
                </div>
                <div className='md:col-span-3'>
                    <div className='border rounded p-4 shadow-lg'>
                    <ul className='space-y-4'>
                        <li className='flex justify-between'>
                        <span>Price:</span>
                        <strong>${product.price}</strong>
                        </li>
                        <li className='flex justify-between'>
                        <span>Status:</span>
                        <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                        </li>
                        {product.countInStock > 0 && (
                        <li className='flex justify-between items-center'>
                            <span>Qty:</span>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setQty((prevQty) => Math.max(prevQty - 1, 1))}
                                    className="px-2 py-1 bg-gray-300 rounded-l"
                                >
                                    -
                                </button>
                                
                                <input
                                    type="text"
                                    value={qty}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        const numericValue = Math.min(value, product.countInStock);
                                        setQty(numericValue > 0 ? numericValue : 1);
                                    }}
                                    className="border text-center w-16 px-2 py-1"
                                    style={{
                                        appearance: 'none',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield',
                                        margin: 0,
                                        outline: 'none',
                                    }}
                                    min="1"
                                    max={product.countInStock}
                                />
                                
                                <button
                                    type="button"
                                    onClick={() => setQty((prevQty) => Math.min(prevQty + 1, product.countInStock))}
                                    className="px-2 py-1 bg-gray-300 rounded-r"
                                >
                                    +
                                </button>
                            </div>

                        </li>
                        )}
                        <li>
                        <button
                            onClick={addToCartHandler}
                            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
                            disabled={product.countInStock === 0}
                        >
                            Add to Cart
                        </button>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className='col-span-6 mt-6'>
                    <h2 className='text-3xl mb-6 font-bold'>Reviews</h2>
                    {product.reviews.length === 0 && 
                        <div className=' p-4 rounded-lg shadow-md'>
                            <h2 className='text-xl font-semibold'>No Reviews Yet!</h2>
                            <p className='mt-2'>
                                Be the first to share your thoughts! Your feedback helps others discover this product.
                            </p>
                    </div>
                    }
                    <ul className='space-y-4'>
                    {product.reviews.map((review) => (
                        <li key={review.id} className='border-b pb-4 mb-4'>
                            <strong className='text-lg font-semibold'>{review.name}</strong>
                            <div className='flex items-center my-2'>
                                <Rating value={review.rating} starSize="1.5rem" color='#f8e825' />
                            </div>
                            <p className='text-gray-500 text-sm'>{review.createdAt.substring(0, 10)}</p>
                            <p className='text-gray-800 text-lg'>{review.comment}</p>
                        </li>
                    ))}
                    <li >
                        {loadingProductReview && <Loader />}
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                        <h4 className='font-bold p-4 text-lg'>Write A Review</h4>
                        {userInfo ? (
                        <form onSubmit={submitHandler} className='space-y-4'>
                            <div>
                            <label className="block text-gray-700 font-semibold mb-2 px-4">
                                Rating
                            </label>
                            <StarRating rating={rating} setRating={setRating} />
                            </div>
                            <div>
                            <label className='block text-gray-700 font-semibold mb-2 px-4'>Review</label>
                            <textarea
                                className='border border-black rounded mx-4 px-2 py-1 w-full'
                                placeholder='Enter your comment'
                                rows='5'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            </div>
                            <button
                            disabled={loadingProductReview}
                            type='submit'
                            className='bg-blue-500 text-white py-2  mx-4 px-4 rounded hover:bg-blue-600'>
                            Submit
                            </button>
                        </form>
                        ) : (
                            <div className="flex items-center justify-center p-4 bg-yellow-100 border border-yellow-400 rounded-md shadow-md">
                                <span className="text-lg text-gray-700">
                                    Please 
                                    <ScrollLink to="/login" className="text-blue-500 hover:underline font-semibold ml-1">
                                        Login
                                    </ScrollLink> 
                                    to write a review.
                                </span>
                            </div>

                        )}
                    </li>
                    </ul>
                </div> 
            </div>
        )}
        </div>
    );
}

export default Product;
