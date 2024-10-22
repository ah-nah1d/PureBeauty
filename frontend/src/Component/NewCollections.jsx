import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { listProducts } from '../Actions/ProductActions';
import  ScrollLink  from './ScrollLink';
import ItemCards from './ItemCards'

function NewCollections() {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const featuredProducts = products.filter((product) => product.isFeatured);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="shadow" style={{ transform: 'scale(0.75)', transformOrigin: 'top ' }}>
        <div className="text-4xl items-center  pb-4">New Collections</div>
        {loading ? (
            <Loader />
        ) : error ? (
            <div>Error: {error}</div>
        ) : (
            <div className='flex flex-wrap'>
                {
                    featuredProducts.map((product) => (
                        <div key={product.id} className=" w-1/3 p-3">
                            <ItemCards product={product}/>
                        </div>
                    ))
                }
            </div>
        )}
        </div>
    );
}

export default NewCollections;
