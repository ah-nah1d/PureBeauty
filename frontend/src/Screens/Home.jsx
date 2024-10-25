import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'; 

import {FaChevronDown } from 'react-icons/fa';


import Header from '../Component/Header'
import NavBar from '../Component/NavBar'
import Loader from '../Component/Loader'
import Message from '../Component/Message'
import BestDeals from '../Component/BestDeals'
import NewCollections from '../Component/NewCollections'
import ScrollLink from '../Component/ScrollLink'
import Footer from '../Component/Footer'

import { listCategories } from '../Actions/ProductActions'

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch =useDispatch()
    
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

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
            <div className="py-4 px-40 flex gap-4">
                <HashLink smooth id='best-deals' to="#best-deals" className="text-black px-4">Best Deals</HashLink>
                <HashLink smooth to="#new-collections" className="text-black px-4">New Collections</HashLink>
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
                        <div className='absolute mt-2 bg-white border rounded-md shadow-lg z-20'>
                            {loading ? <Loader /> : error ? <Message variant='error'>{error}</Message>: (
                                categories.map((category) => (
                                    <div className="right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                        <ScrollLink to = {`/category/${category.id}/${category.name.replace(/\s+/g, '-')}`}
                                            key={category.id}
                                            className="block px-4 py-2 shadow text-gray-800 hover:	"
                                        >
                                            {category.name}
                                        </ScrollLink>
                                    </div>
                                ))
                            )}
                        </div> 
                    )}
                </div>
            </div>
            <div className='flex-row'> 
                <section >
                    <BestDeals />
                </section>
                <section style={{ marginTop: '-180px' }} id="new-collections">
                    <NewCollections />
                </section>
            </div>
            <div className='border' style={{ marginTop: '-180px' }}>
                <Footer/>
            </div>
        </>
    )
}

export default Home