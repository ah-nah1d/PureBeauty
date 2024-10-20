import React from 'react'
import {  FaSearch} from 'react-icons/fa';


function SearchBox() {
  return (
    <div className="relative border border-gray-300 rounded-full bg-gray-300" >
        <input
            type="text"
            placeholder="Search..."
            className="border rounded-l-full border-gray-300 px-4 py-1  w-5/6"
        />
        <button><FaSearch className=" absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600" /></button>
    </div>
  )
}

export default SearchBox