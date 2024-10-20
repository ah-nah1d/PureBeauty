import React from 'react'
import { FaSearch } from 'react-icons/fa'
function Search() {
    return (
        <div className="relative border border-gray-300 rounded-full" >
            <input
                type="text"
                placeholder="Search..."
                className="border rounded-full border-gray-300 px-4 py-2"
            />
            <button >
                <FaSearch className=" absolute rounded-full p-1.5 right-2 top-1/2 text-3xl transform -translate-y-1/2 text-white bg-black" />
            </button>
        </div>
    )
}

export default Search