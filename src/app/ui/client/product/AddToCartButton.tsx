"use client"
import { useCurrentSession } from '@/app/hooks/useCurrentSession';
import { addToCart } from '@/app/lib/addToCartActions';
import { State } from '@/app/lib/types';
import mongoose from 'mongoose'; // Import mongoose
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { Button } from '../../button';

const AddToCartButton = ({ id }: { id: string }) => {
    const initialState: State = { message: null, errors: {} };

    const { session } = useCurrentSession()
    const objectId = new mongoose.Types.ObjectId(id);

    const addToCartBind = addToCart.bind(null, session?.user?.token || "Token Always True", objectId);
    const [bookmarkState, bookMarkAction] = useFormState(addToCartBind, initialState);

    useEffect(() => {
        if (bookmarkState.message) {
            if (bookmarkState.success) {
                toast.success(bookmarkState.message)
            } else {
                toast.error(bookmarkState.message)
            }
        }
    }, [bookmarkState])

    return (
        <div>
            <form action={bookMarkAction} >
                <Button
                    type="submit"
                    className="add_to_cart !text-black w-[100%] md:w-[70%] bg-white  border border-solid border-mainColor max-auto rounded-none flex justify-center items-center py-4 hover:bg-white hover:text-black hover:border-mainColor focus:bg-white focus:text-black focus:border-mainColor active:bg-white active:text-black active:border-mainColor"
                >
                    Add To Cart
                </Button>

            </form>
            <Link href="/buynow">
                <Button className='rounded-none my-3 w-[100%] md:w-[70%] flex justify-center  items-center'>Buy Now</Button>
            </Link>
        </div >
    )
}

export default AddToCartButton