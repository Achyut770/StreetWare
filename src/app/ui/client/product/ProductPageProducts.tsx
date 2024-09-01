import React from 'react'
import IndvProduct from '../../IndvProduct';
import NoProducts from '../../NoProduct';
import { paginateProducts } from '@/app/lib/productactions';

const ProductPageProducts = async ({
    query,
    currentPage,
    productPerPage
}: {
    query: string;
    currentPage: number;
    productPerPage: number
}) => {
    const products = await paginateProducts(currentPage, productPerPage, query)

    return (
        <div className='flex flex-row gap-10 flex-wrap justify-center'>
            {products.length === 0 ? <NoProducts /> : products?.map((items, index) => {
                return <IndvProduct items={items} key={items.id} />
            })}
        </div>
    )
}

export default ProductPageProducts