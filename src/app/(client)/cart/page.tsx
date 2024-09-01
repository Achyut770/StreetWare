import React from 'react'
import { auth } from '@/auth'
import { getCartByToken, getTotalQuantity } from '@/app/lib/addToCartActions'
import NoProducts from '@/app/ui/NoProduct'
import CasrtDisplay from '@/app/ui/client/cart/CasrtDisplay'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cart',
};


const Page = async () => {
    const session = await auth()
    if (!session?.user) return
    const [items, totalPrice] = await Promise.all([
        getCartByToken(session?.user.token),
        getTotalQuantity(session?.user.token)
    ]);
    console.log("Items ", items)
    return (
        <div className='my-6 min-h-[50vh]' >
            {!items || items.length === 0 ? <NoProducts message='No Product in the cart' /> : <CasrtDisplay items={items} totalPrice={totalPrice} />}
        </div>
    )
}

export default Page