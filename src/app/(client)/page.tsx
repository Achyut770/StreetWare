import Hero from '../ui/client/Hero'
import NewProduct from '../ui/client/NewProduct'
import PhotoPara from '../ui/client/PhotoPara'
import RichText from '../ui/client/RichText'
import Testimonals from '../ui/client/Testimonals'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home',
};

const Page = () => {
    return (
        <section className='flex flex-col gap-20'>
            <Hero />
            <NewProduct />
            <PhotoPara />
            <Testimonals />
            <RichText />
        </section>
    )
}

export default Page