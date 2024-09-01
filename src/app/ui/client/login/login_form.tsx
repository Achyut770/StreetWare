"use client"
import { useFormState } from 'react-dom';
import { Button } from '../../button';
import { authenticate } from '@/app/lib/userActions';

const Loginform = () => {
    const [state, formAction] = useFormState(authenticate, undefined);
    return (
        <form action={formAction} >
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {state && <div className='text-red-500 mt-1 text-sm'> {state} </div>}
            <Button
                type="submit"
                className="mx-auto w-full flex justify-center mt-4"
            >
                Login
            </Button>
        </form>
    )
}

export default Loginform