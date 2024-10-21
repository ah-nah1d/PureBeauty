import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { Link,useLocation } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import { fetchAbout,fetchSocial,fetchContact } from '../Actions/WebsiteActions';


import Loader from './Loader'

function Footer() {
    const dispatch = useDispatch();
    const location = useLocation();

    
    const about = useSelector(state => state.about);
    const { loading, abouts } = about;

    const social = useSelector(state => state.social);
    const { loading:loadingSocial, socials } = social;

    const contact = useSelector(state => state.contact);
    const { loading:loadingContact, contacts } = contact;

    useEffect(() => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        dispatch(fetchAbout());
        dispatch(fetchSocial());
        dispatch(fetchContact())
    }, [dispatch,location]);
    return (
        <div className="w-full my-4 flex flex-row gap-5 px-12">
            <div className='w-3/5 '>
                <div >
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    {loading && <Loader />}
                    {abouts.length > 0 ? (
                        <p className="text-gray-700 ">{abouts[0].title}</p>
                    ): (
                        <p className="text-center text-white">No Active Headers found</p>
                    )}
                </div>
                <div className='py-2 flex flex-row gap-4'>
                    {loadingSocial && <Loader />}
                    {socials.length > 0 ? (
                        socials.map((social) => (
                            <a
                                href={social.link}
                                key={social.id}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group flex items-center"
                            >
                                <img 
                                    src={`http://127.0.0.1:8000/${social.icons}`} 
                                    alt={social.title} 
                                    className="w-10 h-10"
                                />
                            </a>
                        ))
                        
                    ): (
                        <p className="text-center text-white">No Active Headers found</p>
                    )} 
                </div>
            </div>
            <div className='w-1/5'>
                <h1 className="text-4xl font-bold mb-4">Quick Links</h1>
                <ul>
                    <li><Link to="/" className="text-lg text-gray-700 hover:text-gray-900">Home</Link></li>
                    <li><Link to="/about" className="text-lg text-gray-700 hover:text-gray-900">About Us</Link></li>
                    <li><Link to="/contact" className="text-lg text-gray-700 hover:text-gray-900">Contact Us</Link></li>
                </ul>
            </div>
            <div className='w-1/5'>
                <h1 className="text-4xl mb-4 font-bold">Contact Us</h1>
                {loadingContact && <Loader />}
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <div key={contact.id}>
                            <div className="flex mb-3 items-center">
                                <FaMapMarkerAlt className="text-gray-700 mr-2" size={15} />
                                <span className="text-gray-700">Location: {contact.address}</span>
                            </div>
                            <div className="flex items-center mb-3">
                                <FaPhoneAlt className="text-gray-700 mr-2" size={15} />
                                <span className="text-gray-700">Phone: {contact.phone}</span>
                            </div>
                            <div className="flex items-center mb-3">
                                <FaEnvelope className="text-gray-700 mr-2" size={15} />
                                <span className="text-gray-700">Email: {contact.email}</span>
                            </div>
                        </div>
                    ))
                    
                ): (
                    <p className="text-center text-white">Error Fetching Data</p>
                )}
        </div>
        </div>
    )
}

export default Footer