import Image from 'next/image'
import React from 'react'

const DashboardBottomLeft = () => {
    return (
        <div className='w-[97%] lg:w-[49%] '>
            <b className='text-xl '>Total Revenue</b>
            <div className='p-3 rounded-md bg-gray-50 mt-4 shadow-product box-border'>
                <div className='bg-white p-2'>
                    <Image src="/chart.svg" height={250} width={800} objectFit='responsive' alt="Chart Image" />
                </div>
            </div>

        </div>
    )
}

export default DashboardBottomLeft