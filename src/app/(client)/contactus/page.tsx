import Contact_Form from '@/app/ui/client/contactus/Contact_Form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
};


const ContactPage = () => {
    return (
        <section>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <div className="mb-4 text-4xl tracking-tight font-extrabold text-center text-mainColor">
                    Contact Us
                </div>
                <div className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Got a technical issue? Want to send feedback about a beta feature? Need details about our New Product? Let us know.
                </div>
                <Contact_Form />
            </div>
        </section>
    );
};

export default ContactPage;
