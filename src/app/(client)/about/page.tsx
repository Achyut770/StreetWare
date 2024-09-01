import Link from 'next/link';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
};


const AboutPage = () => {
    return (
        <section className=" py-8">
            <div className="max-w-screen-lg mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-mainColor mb-6">
                    About Us
                </h1>
                <p className="text-lg text-gray-700 dark:text-black mb-6">
                    Welcome to StreetWare, your ultimate destination for the latest in street fashion. Our goal is to bring you the most unique and high-quality streetwear that helps you express your individuality and style.
                </p>
                <p className="text-lg text-gray-700 dark:text-black mb-6">
                    At StreetWare, we pride ourselves on curating exclusive collections from top brands and emerging designers. Each piece is carefully selected to ensure quality and authenticity, reflecting our commitment to offering you only the best in street fashion.
                </p>
                <p className="text-lg text-gray-700 dark:text-black mb-6">
                    Our community is at the heart of everything we do. We collaborate with local artists and fashion influencers to bring you fresh and innovative designs. Join us in celebrating creativity and self-expression through our diverse range of products.
                </p>
                <p className="text-lg text-gray-700 dark:text-black">
                    Thank you for choosing StreetWare. We are excited to have you as part of our community. For any inquiries or support, please visit our <Link href="/contactus" className="text-mainColor  hover:underline">Contact Us</Link> page.
                </p>
            </div>
        </section>
    );
};

export default AboutPage;
