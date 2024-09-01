"use client"
import { SignUp } from '@/app/lib/userActions';
import { State } from '@/app/lib/types';
import { useFormState } from 'react-dom';
import { Button } from '../../button';

const SignupForm = () => {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useFormState(SignUp, initialState);
    console.log("State", state)
    return (
        <form action={formAction} >
            <div className="mb-2 md:mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state?.errors?.name && <div className='text-red-500 mt-1 text-sm'> {state?.errors?.name[0]} </div>}
            </div>
            <div className="mb-2 md:mb-4 ">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state?.errors?.email && <div className='text-red-500 mt-1 text-sm'> {state?.errors?.email[0]} </div>}

            </div>
            <div className="mb-2 md:mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state?.errors?.password && <div className='text-red-500 mt-1 text-sm'> {state?.errors?.password[0]} </div>}

            </div>
            <div className="mb-2 md:mb-4">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    name="confirm_password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {state?.errors?.confirm_password && <div className='text-red-500 mt-1 text-sm'> {state?.errors?.confirm_password[0]} </div>}

            </div>
            {state?.errors?.already_exist && <div className='text-red-500 mt-1 mb-2 text-sm'> {state?.errors?.already_exist[0]} </div>}
            {!state.success && <div className='text-red-500 mt-1 mb-2 text-sm'> {state?.message} </div>}
            <Button
                type="submit"
                className="mx-auto w-full flex justify-center"
            >
                Sign Up
            </Button>
        </form>
    )
}

export default SignupForm