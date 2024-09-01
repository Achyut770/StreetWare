import Loginform from "@/app/ui/client/login/login_form";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Log In',
};


const LoginPage = () => {


    return (
        <div className="flex max-w-full  items-center justify-center py-10 w-screen bg-gray-100 overflow-hidden">
            <div className="w-[98%] md:w-full max-w-md p-4 md:p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <Loginform />
                {/* <div className="flex flex-row gap-4 my-4 items-center justify-center">
                    <div className="w-1/2 h-[1px] bg-gray-200"></div>
                    <div>or</div>
                    <div className="w-1/2 h-[1px] bg-gray-200"></div>
                </div>
                <GoogleSignIn /> */}
                <div className="mt-4 text-center">
                    Don't have an account?
                    <Link href="/signup" className="text-indigo-600 hover:text-indigo-700">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
