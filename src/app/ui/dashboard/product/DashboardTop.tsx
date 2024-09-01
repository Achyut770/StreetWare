import clsx from 'clsx'
import React from 'react'

const DashboardTop = () => {
    const dashboardTop = [{
        name: "Total Sales",
        number: "$ 1,000,005,00",
        percentage: "13"
    },
    {
        name: "AOV",
        number: "$45",
        percentage: "-25"

    },
    {
        name: "Order",
        number: "5987",
        percentage: "-5"

    },
    {
        name: "Total Impression",
        number: "928736",
        percentage: "5"
    }
    ]
    return (
        <div className='flex flex-row gap-5 flex-wrap justify-center lg:justify-between'>
            {dashboardTop.map((items) => {
                return <div key={items.name} className='shadow-product p-3 w-full md:min-w-[280px] md:w-[23%] flex flex-col gap-6 rounded-md bg-gray-50'>
                    <div className='flex flex-row justify-between' >
                        <b>{items.name}</b>
                        <div className='text-mainColor text-sm cursor-pointer'>View Report</div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <b className='text-xl'>{items.number}</b>
                        <div className={clsx({ 'text-green-500': Number(items.percentage) > 0, 'text-red-500': Number(items.percentage) <= 0 })}>
                            {items.percentage}%
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default DashboardTop