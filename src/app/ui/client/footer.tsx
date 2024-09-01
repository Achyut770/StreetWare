// components/Footer.js

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='border-t-2'>
            <div className="  border-solid border-gray-500 mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-mainColor">
                                StreetWare
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-mainColor uppercase ">Quick Links</h2>
                            <ul className="text-gray-600  font-medium">
                                <li className="mb-4">
                                    <Link href="/contactus" className="hover:underline">Contact Us</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/about" className="hover:underline">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/product" className="hover:underline">Product</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-mainColor uppercase">Follow us</h2>
                            <ul className="text-gray-600  font-medium">
                                <li className="mb-4">
                                    <Link href="https://github.com/Achyut770/" className="hover:underline flex items-center">
                                        <FaGithub className="w-4 h-4 me-2" />
                                        Github
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.facebook.com/" className="hover:underline flex items-center">
                                        <FaDiscord className="w-4 h-4 me-2" />
                                        Discord
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-mainColor uppercase ">Legal</h2>
                            <ul className="text-gray-600  font-medium">
                                <li className="mb-4">
                                    <Link href="#" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-600 sm:text-center ">
                        © 2024 <Link href="/" className="hover:underline">StreetWare™</Link>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center ms-5">
                            <FaFacebookF className="w-4 h-4 me-2" />
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center ms-5">
                            <FaDiscord className="w-4 h-4 me-2" />
                            <span className="sr-only">Discord community</span>
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center ms-5">
                            <FaTwitter className="w-4 h-4 me-2" />
                            <span className="sr-only">Twitter page</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
