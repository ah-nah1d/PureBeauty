import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'



import NavBar from '../../Component/NavBar'
import ItemCards from '../../Component/ItemCards'
import Loader from '../../Component/Loader'
import Message from '../../Component/Message'
import Footer from '../../Component/Footer'

import { listProducts } from '../../Actions/ProductActions'


function Sale() {
    const dispatch =useDispatch()
        
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const filteredProducts = products.filter(product => product.onSale === true);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
        <NavBar/>
        <div className=' flex flex-wrap px-16 shadow'>
            {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : (
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="w-1/4 p-3">
                                <ItemCards product={product} />
                            </div>
                        ))
                    ) : (
                        <div className='flex items-center justify-center w-screen h-screen'>
                            <div>Courrently no product is on Sale.</div>
                        </div>
                    )
                )}
        </div>
        <Footer/>
        </>
    )
}

export default Sale