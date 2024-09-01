import { paginateProducts } from '@/app/lib/productactions';
import IndvProduct from '../IndvProduct';

const NewProduct = async () => {
    const products = await paginateProducts(1, 4)
    return (
        <section className='w-[95%] mx-auto'>
            <h1 className='text-3xl mb-10'>All Products</h1>
            <div className='flex flex-row flex-wrap  justify-around lg:justify-between my-20px gap-7 '>
                {products?.map((items) => {
                    return <IndvProduct key={items.id} items={items} />
                })}
            </div>
        </section>
    )
}

export default NewProduct