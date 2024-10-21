import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaders } from '../Actions/WebsiteActions'; 

import Loader from './Loader'

function Header() {
    const dispatch = useDispatch();
    
    const header = useSelector(state => state.header);
    const { loading, error, headers } = header;

    useEffect(() => {
        dispatch(fetchHeaders());
    }, [dispatch]);

    return (
        <div className="bg-black p-1">
            {loading && <Loader />}
            {headers.length > 0 ? (
                <div className="text-center">
                    <h2 className="text-sm font-semibold text-white">{headers[0].title}</h2>
                </div>
            ) : (
                <p className="text-center text-white">No Active Headers found</p>
            )}
        </div>
    )
}

export default Header;
