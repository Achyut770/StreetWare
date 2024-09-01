import { ICartItem } from '@/app/modals/addToCart'
import React from 'react'
import CartProduct from './CartProduct'
import { Button } from '../../button'

const CasrtDisplay = ({ items, totalPrice }: { items: ICartItem[], totalPrice: number }) => {

    return (
        <div className='max-w-[1300px] w-[95%] mx-auto'>
            {items.map((item, index) => {
                return <CartProduct item={item} key={item.productId.toString()} />
            })}
            <div className='text-right'>
                <div><b>Total :</b> ${totalPrice.toFixed(2)}</div>
                <Button className='ml-auto'>
                    Proceed To CheckOut
                </Button>
            </div>
        </div>
    )
}

export default CasrtDisplay