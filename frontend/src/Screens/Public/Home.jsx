import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import {FaChevronDown } from 'react-icons/fa';


import Header from '../../Component/Header'
import NavBar from '../../Component/NavBar'
import Loader from '../../Component/Loader'
import Message from '../../Component/Message'

import { listCategories } from '../../Actions/ProductActions'

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch =useDispatch()
    
    const CategoryList = useSelector((state) => state.CategoryList);
    const { loading, error, categories } = CategoryList;

    useEffect(() => {
        dispatch(listCategories());
    }, [dispatch]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Header/>
            <NavBar/>
            <div className="p-4 flex gap-4">
                <div>Best Deals</div>
                <div>New Collections</div>
                <div>Available Items</div>
                <div className="relative">
                    <button
                        title='Category'
                        id="category"
                        onClick={toggleDropdown}
                        className="text-black px-4 flex items-center"
                    >   Category
                        <FaChevronDown 
                            className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        />
                    </button>
            
                    {isOpen && (
                        <div className='border rounded-xl'>
                            {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message>: (
                                categories.map((category) => (
                                    <div className="right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                        <Link to = {`/product/${category.name.replace(/\s+/g, '-')}`}
                                            key={category.id}
                                            className="block px-4 py-2 shadow text-gray-800 hover:	"
                                        >
                                            {category.name}
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div> 
                    )}
                        </div>
            </div>
        </>
    )
}

export default Home