import CreateProductForm from '@/app/ui/dashboard/product/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Product',
};


const Page = () => {
    return (
        <div>
            <b className='text-2xl'>Create Product</b>
            <CreateProductForm />
        </div>
    );
};
export default Page;


