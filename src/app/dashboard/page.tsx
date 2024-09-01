import React, { Suspense } from 'react'
import DashboardTop from '../ui/dashboard/product/DashboardTop'
import DashboardBottomLeft from '../ui/dashboard/product/DashboardBottomLeft'
import DashboardBottomRight from '../ui/dashboard/product/DashboardBottomRight'
import DashboardBottomSkeleton from '../ui/skeletons/DashboardBottomRight'

const Page = () => {
    return (
        <div className='flex flex-col gap-10'>
            <b className='text-2xl'>Dashboard</b>
            <DashboardTop />
            <div className='flex flex-col items-center lg:items-start lg:flex-row justify-between'>
                <DashboardBottomLeft />
                <Suspense fallback={<DashboardBottomSkeleton />}>
                    <DashboardBottomRight />
                </Suspense>
            </div>
        </div>
    );
}

export default Page