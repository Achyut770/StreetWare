import { fetchProductById } from '@/app/lib/productactions'
import { ICartItem } from '@/app/modals/addToCart'
import Image from 'next/image'
import React from 'react'
import CartIndvInput from './CartIndvInput'
import Link from 'next/link'

const CartProduct = async ({ item }: { item: ICartItem }) => {
    const product = await fetchProductById(item.productId.toString())
    if (!product) return
    let price = product.price - product.price * product.discount / 100
    return (
        <div key={product.id} className='flex flex-row justify-between items-center my-4'>
            <div className='flex flex-row gap-2'>
                <Image
                    width={150}
                    height={100}
                    src={product.imageUrl[0]}
                    alt={product.name}
                    className='w-[100px] h-[100px] md:h-[150px] md:w-[150px]'
                />
                <div className='flex flex-col gap-2 md:gap-6 text-[12px] md:text-[16px]'>
                    <div>
                        <Link href={`/product/${product.id}`} > <b>{product.name}</b></Link >
                        <div>${price.toFixed(2)}</div>
                    </div>
                    <CartIndvInput productId={product.id} quantity={item.quantity} />
                </div>
            </div>
            <div>${(price * item.quantity).toFixed(2)}</div>
        </div>
    )
}

export default CartProduct