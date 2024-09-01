import Link from 'next/link';

export default function Custom404({ message = "Page", buttonName = "Home", href = "/" }: { message?: string, buttonName?: string, href?: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">
                Oops! The   {message} you're looking for doesn't exist.
            </p>
            <Link href={href} className="px-6 py-3 text-lg text-white bg-mainColor rounded-md hover:bg-bgHoverButton transition duration-300">
                Go Back   {buttonName}
            </Link>
        </div>
    );
}
