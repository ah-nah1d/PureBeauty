import React from 'react'
import { Link } from 'react-router-dom'

import Rating from './Rating'

function ItemCards({product}) {
    const imageUrl = `http://localhost:8000${product.image}`;
    return (
        <div className="bg-white shadow-md rounded-lg p-4 my-3">
            <Link to={`/product/${product.slug}`}>
                <img className="w-full h-64 object-cover rounded-t-lg" src={imageUrl} alt={product.name} />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                <h3 className="font-semibold text-lg text-gray-800">
                    {product.name}
                </h3>
                </Link>
                <div className="my-3">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                ৳{product.price}
                </h3>
            </div>
        </div>
    )
}

export default ItemCards