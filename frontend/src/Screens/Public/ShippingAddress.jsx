import React from 'react'

function ShippingAddress() {
  return (
    <div className="mb-4">
        <label className="block text-gray-700">Shipping Address:</label>
        <input
            type="text"
            name="shippingAddress"
            value={user.shippingAddress}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
    </div>

                        
  )
}

export default ShippingAddress