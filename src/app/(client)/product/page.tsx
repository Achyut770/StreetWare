import { countProductsContainingSubstring } from '@/app/lib/productactions';
import Paginations from '@/app/ui/client/product/Paginations';
import ProductPageProducts from '@/app/ui/client/product/ProductPageProducts';
import Search from '@/app/ui/client/product/Search';
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
        <section className='flex flex-col gap-10 w-[90%] mx-auto my-10'>
            <Search />
            <ProductPageProducts query={query} currentPage={currentPage} productPerPage={productPerPage} />
            <Paginations totalPages={Math.ceil(productsLength / productPerPage)} />
        </section>
    )
}

export default ProductPage