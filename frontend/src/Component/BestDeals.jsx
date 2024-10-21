import React from 'react'

function BestDeals() {
  return (
    <div className='w-full h-screen px-20 flex flex-row'>
        <div className='w-1/3'>
            sale
        </div>
        <div className='w-1/3 flex flex-col'>
            <div className='h-2/3'>
                best category
            </div>
            <div className='h-1/3'>
                2nd best category
            </div>
        </div>
        <div className='w-1/3 flex flex-col'>
            <div className='h-1/3'>
                3rd best category
            </div>
            <div className='h-1/3'>
                4th best category
            </div>
            <div className='h-1/3'>
                new collections
            </div>
        </div>

    </div>
  )
}

export default BestDeals