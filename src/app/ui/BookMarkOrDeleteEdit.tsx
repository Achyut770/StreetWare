"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFormState } from 'react-dom';
import { IoBookmarksOutline } from 'react-icons/io5';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { deleteProduct } from '../lib/productactions';
import { State } from '../lib/types';
import { addToCart } from '../lib/addToCartActions';
import { useCurrentSession } from '../hooks/useCurrentSession';
import mongoose from 'mongoose';  // Import mongoose
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const BookMarkOrDeleteEdit = ({ id }: { id: string }) => {
    const initialState: State = { message: null, errors: {} };
    const pathname = usePathname();
    const { session } = useCurrentSession();
    const isDashboard = pathname.startsWith('/dashboard');
    console.log("Session", session?.user.token)

    const isLoggedIn = session?.user

    const deleteProd = deleteProduct.bind(null, session?.user.token || "", id);

    const objectId = new mongoose.Types.ObjectId(id);

    const addToCartBind = addToCart.bind(null, session?.user?.token || "Token Always True", objectId);

    const [state, formAction] = useFormState(deleteProd, initialState);
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

    useEffect(() => {
        if (state.message) {
            if (!state.errors) {
                toast.success(state.message)
            } else {
                toast.error("Cannot Add The Item")
            }
        }
    }, [state])

    return (
        <>
            {!isDashboard && isLoggedIn && (
                <form action={bookMarkAction}>
                    <button type='submit' className='absolute top-3 right-3 bg-white p-1 shadow-bookmark rounded-sm cursor-pointer'>
                        <IoBookmarksOutline className='text-[20px]' />
                    </button>
                </form>
            )}
            {isDashboard && (
                <div className='absolute top-3 right-3 flex flex-row gap-3'>
                    <Link href={`/dashboard/product/edit/${id}`} className='bg-white p-1 text-green-900 shadow-bookmark rounded-sm cursor-pointer'>
                        <MdModeEditOutline className='text-[20px]' />
                    </Link>
                    <form action={formAction}>
                        <button type='submit' className='bg-white p-1 text-red-900 shadow-bookmark rounded-sm cursor-pointer'>
                            <MdDelete className='text-[20px]' />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default BookMarkOrDeleteEdit;
