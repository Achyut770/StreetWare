import { countProductsContainingSubstring } from '@/app/lib/productactions';
import { Button } from '@/app/ui/button';
import Paginations from '@/app/ui/client/product/Paginations';
import ProductPageProducts from '@/app/ui/client/product/ProductPageProducts';
import Search from '@/app/ui/client/product/Search';
import ProductSkeletonLoader from '@/app/ui/skeletons/ProductPage';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaPlus } from "react-icons/fa6";

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product',
};



const ProductPage = async (
    {
        searchParams,
    }: {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }
) => {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const productPerPage = 12
    const productsLength = await countProductsContainingSubstring(query)
    return (
        <section className='flex flex-col gap-10  mx-auto'>
            <b className='text-2xl' >Product Page </b>
            <div className='flex flex-row gap-5'>
                <Search />
                <Link href="/dashboard/product/create" > <Button>Creat Product &nbsp; <FaPlus /> </Button> </Link>
            </div>
            <Suspense fallback={<ProductSkeletonLoader />} >
                <ProductPageProducts query={query} currentPage={currentPage} productPerPage={productPerPage} />
            </Suspense>

            <Paginations totalPages={Math.ceil(productsLength / productPerPage)} />
        </section>
    )
}

export default ProductPage