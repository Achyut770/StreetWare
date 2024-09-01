import { fetchProductById } from '@/app/lib/productactions'
import AddToCartButton from '@/app/ui/client/product/AddToCartButton'
import DropDownProduct from '@/app/ui/client/product/DropDown'
import Images from '@/app/ui/dashboard/product/Images'
import { notFound } from 'next/navigation'


const Page = async ({ params }: { params: { id: string } }) => {
    const id = params.id

    const product = await fetchProductById(id)

    if (!product) {
        notFound()
    }
    const discountPrice = product.price - product.price * product.discount / 100

    return (
        <div className="flex flex-col justify-between md:flex-row mx-auto max-w-[1300px] w-[95%] gap-12 md-gap-6 my-10">
            <div className="w-[97%] md:w-1/2">
                <div className="sticky top-6">
                    <Images imageUrl={product.imageUrl} />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-4xl md:text-5xl mb-6">{product.name}</h1>
                <p className="text-xl text-gray-700 mb-2 flex flex-row gap-3">
                    ${discountPrice.toFixed(2)}
                    <span className="text-red-500 line-through">${product.price}</span>
                </p>
                <AddToCartButton id={product.id} />
                <div className=" mt-4 " dangerouslySetInnerHTML={{ __html: product.description }} />
                <DropDownProduct />

            </div>
        </div>
    )
}

export default Page