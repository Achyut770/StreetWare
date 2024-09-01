import Custom404 from '@/app/ui/Custom404'
import React from 'react'

const Notfound = () => {
    return (
        <Custom404 message="Product" buttonName='Product' href='/dashboard/product' />
    )
}

export default Notfound