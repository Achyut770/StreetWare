import { fetchProductById } from '@/app/lib/productactions'
import EditProductForm from '@/app/ui/dashboard/product/edit-product'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {

    const product = await fetchProductById(params.id)
    if (!product) {
        notFound()
    }

    return (
        <div>
            <b className='text-2xl'>Edit Product</b>
            <EditProductForm product={product} id={params.id} />
        </div>
    )
}

export default Page