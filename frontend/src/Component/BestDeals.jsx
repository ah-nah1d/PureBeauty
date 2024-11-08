import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { MdArrowOutward,MdArrowForward } from "react-icons/md";


import Loader from './Loader'

import { FeaturedItems } from '../Actions/ProductActions'
import ScrollLink from './ScrollLink'

function BestDeals() {
    const dispatch =useDispatch()
    
    const featuredItems = useSelector((state) => state.featuredItems);
    const { loading,featuredItem } = featuredItems;
    const { featured_homes = [], featured_categories = [] } = featuredItem;

    useEffect(() => {
        dispatch(FeaturedItems());
    }, [dispatch]);
    return (
        <div className=" grid grid-cols-5 grid-rows-3 gap-4" style={{ transform: 'scale(0.75)', transformOrigin: 'top ' }}>
            <div className="row-span-3 col-span-2 relative">
                {loading && <Loader />}
                {featured_homes.length > 0 && (
                    <>
                        <img 
                            src={`http://127.0.0.1:8000/${featured_homes[0].discountImage}`} 
                            alt={featured_homes[0].id}
                            className="w-full h-full rounded-3xl object-cover" 
                        />
                        <span className="absolute top-0 right-0 bg-stone-300 bg-opacity-25 text-white p-7 pb-0 rounded-bl-3xl grid grid-cols-3 grid-rows-3 "style={{ transform: 'scale(0.50)', transformOrigin: 'top right ' }}>
                            <div className='text-6xl row-span-1 col-span-3 items-center'>Discount</div>
                            <div className="text-9xl row-span-2 col-span-2 items-center">{featured_homes[0].discountAmmount}</div>
                            <div className="text-7xl row-span-1 col-span-1 items-center">%</div>
                            <div className="text-4xl row-span-1 col-span-1 items-center">off</div>
                        </span>
                        <span className="absolute bottom-0 left-0 m-10 text-white  m-5 pb-0">
                            <div className='text-3xl items-center'>Special Offer</div>
                            <div className="text-6xl items-center">{featured_homes[0].discountName} Sale</div>
                            <div className='flex text-2xl py-3 text-white rounded-full justify-center bg-black inline-flex'>
                                <ScrollLink to='/Sale' className="mx-5 items-center">Shop Now</ScrollLink>
                            </div>
                        </span>
                    </>
                )}
            </div>
            <div className="row-span-2 col-span-2 relative">
                {loading && <Loader />}
                {featured_categories.length > 0 && (
                    <>
                        <img 
                            src={`http://127.0.0.1:8000/${featured_categories[1].banner}`} 
                            alt={featured_categories[1].id}
                            className="w-full h-full rounded-3xl object-cover" 
                        />
                        <span className="absolute bottom-0 left-0 mx-16 my-10 text-white ">
                            <div className='text-4xl items-center'>Exquisite</div>
                            <div className="text-4xl items-center">Hair Solutions</div>
                        </span>
                        <ScrollLink
                            to={`/category/${featured_categories[1].id}/${featured_categories[1].name.replace(/\s+/g, '-')}`}
                            className="absolute bottom-0 right-0 mx-20 my-16  text-white">
                            <MdArrowOutward className="text-4xl justify-cnter items-center"/>
                        </ScrollLink>
                    </>
                )}
            </div>
            <div className="row-span-1 col-span-1 relative">
                {loading && <Loader />}
                {featured_categories.length > 0 && (
                    <>
                        <img 
                            src={`http://127.0.0.1:8000/${featured_categories[2].banner}`} 
                            alt={featured_categories[2].id}
                            className="w-full h-full rounded-3xl object-cover" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 p-4  flex justify-between items-center">
                            <div className="font-bold text-white text-2xl">Discover Glow</div>
                            <ScrollLink
                                to={`/category/${featured_categories[2].id}/${featured_categories[2].name.replace(/\s+/g, '-')}`}
                            >
                                <MdArrowOutward className="text-4xl text-white justify-cnter items-center"/>
                            </ScrollLink>
                        </div>

                    </>
                )}
            </div>
            <div className="row-span-1 col-span-1 relative ">
                {loading && <Loader />}
                {featured_categories.length > 0 && (
                    <>
                        <img 
                            src={`http://127.0.0.1:8000/${featured_categories[3].banner}`} 
                            alt={featured_categories[3].id}
                            className="w-full h-full rounded-3xl object-cover" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 p-4  flex justify-between items-center">
                            <div className="font-bold text-white text-2xl">Skin Radiance</div>
                            <ScrollLink
                                to={`/category/${featured_categories[3].id}/${featured_categories[3].name.replace(/\s+/g, '-')}`}
                            >
                                <MdArrowOutward className="text-4xl text-white justify-cnter items-center"/>
                            </ScrollLink>
                        </div>
                    </>
                )}
            </div>
            <div className="row-span-1 col-span-2 relative">
                {loading && <Loader />}
                {featured_categories.length > 0 && (
                    <>
                        <img 
                            src={`http://127.0.0.1:8000/${featured_categories[0].banner}`} 
                            alt={featured_categories[0].id}
                            className="w-full h-full rounded-3xl object-cover" 
                        />
                        <span className="absolute bottom-0 left-0 mx-8 my-10 text-white ">
                            <div className='text-3xl items-center'>Sublime Mehedi Collection</div>
                        </span>
                        <ScrollLink
                            to={`/category/${featured_categories[0].id}/${featured_categories[0].name.replace(/\s+/g, '-')}`}
                            className="absolute bottom-0 right-0 mx-16 my-10  text-white">
                            <MdArrowOutward className="text-4xl justify-cnter items-center"/>
                        </ScrollLink>
                    </>
                )}
            </div>
            <div className="row-span-1 col-span-1 relative">
                {loading && <Loader />}
                {featured_categories.length > 0 && (
                    <>
                        <div className='text-3xl font-bold pt-7'>New Collection This Season</div>
                        <div className='text-sm pt-3 pb-9 text-slate-500 '>Look out for this season's exclusives and new addition pieces you'll love throughout the coming seasons.</div>
                        <ScrollLink to='/products' className="text-xl p-3 flex text-Black border-2 border-black rounded-full items-center ">View All Collections<MdArrowForward/></ScrollLink>
                    </>
                )}
            </div>
        </div>


    )
}

export default BestDeals