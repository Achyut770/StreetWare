import { paginateProducts } from '@/app/lib/productactions'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const DashboardBottomRight = async () => {
    const products = await paginateProducts(1, 4)

    return (
        <div className='w-[97%]  lg:w-[49%]'>
            <b className='text-xl'>Latest Products</b>
            <div className='p-3 md:p-3 rounded-md bg-gray-50 shadow-product mt-4 box-border'>
                {products.map((items, index) => {
                    return <section key={items.id} className={clsx('w-[100%] h-[83px] bg-white flex items-center flex-row justify-between px-2 md:px-5', { "border-t": index !== 0 })}>
                        <div className='flex flex-row gap-2 md:gap-5 items-center'>
                            <Image src={items.imageUrl[0]} height={20} width={50} alt={items.name} className='w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-[50%]' />
                            <div className='flex flex-col gap-1'>
                                <b className='text-[10px] md:text-[16px]'>{items.name}</b>
                                <div className='text-[8px] md:text-sm text-gray-400'>Number {index + 1} Best Seller</div>
                            </div>
                        </div>
                        <div>${(items.price - items.price * items.discount / 100).toFixed()}</div>
                    </section>

                })}
            </div>
        </div>
    )
}

export default DashboardBottomRight