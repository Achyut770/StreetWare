"use client"
import { useCurrentSession } from '@/app/hooks/useCurrentSession'
import { removeProductFromCart, updateCartQuantity } from '@/app/lib/addToCartActions'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useDebouncedCallback } from 'use-debounce'

const CartIndvInput = ({ productId, quantity }: { productId: string, quantity: number }) => {
    const { session, status } = useCurrentSession()
    const bindRemoveProduct = removeProductFromCart.bind(null, session?.user?.token || "Always True", productId)
    const bindUpdateQuantity = updateCartQuantity.bind(null, session?.user?.token || "Always True", productId)
    const [state, removeAction] = useFormState(bindRemoveProduct, false)

    const handleChange = useDebouncedCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            console.log("Value:", value)
            await bindUpdateQuantity(Number(value))
        },
        500
    );


    if (status === "loading") {
        return
    }

    return (
        <div className="flex items-center gap-3">
            <input
                type="number"
                className="w-12 border border-gray-700 rounded-md pl-[5px]"
                min={1}
                defaultValue={quantity}
                onChange={handleChange}
            />
            <form action={removeAction} >
                <button type="submit" className="text-red-600 p-0">
                    Remove
                </button>
            </form>
        </div>
    )
}

export default CartIndvInput