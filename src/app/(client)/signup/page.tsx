import SignupForm from '@/app/ui/client/signup/sign_up';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up',
};


const SignupPage = () => {

    return (
        <div className="flex max-w-full  items-center justify-center py-10 w-screen bg-gray-100 overflow-hidden">
            <div className="w-[98%] md:w-full max-w-md p-4 md:p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <SignupForm />
                <div className="mt-4 text-center">
                    Already have an account?
                    <Link href="/login" className="text-indigo-600 hover:text-indigo-700">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
