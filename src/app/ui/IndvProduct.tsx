import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '../modals/product';
import BookMarkOrDeleteEdit from './BookMarkOrDeleteEdit';

const IndvProduct = ({ items }: { items: IProduct }) => {
    return (
        (
            <section key={items.id} className='flex flex-col  w-[300px] shadow-product rounded-xl'>
                <div className='relative  w-[100%] h-[220px] rounded-s-sm ' >
                    <Image src={items.imageUrl[0]} layout="fill"
                        objectFit="fit" alt={items.name} className="rounded-xl" />
                    <div className='absolute top-3 left-3 bg-mainColor text-white py-[2px] px-2 rounded-sm'>{items?.discount}%</div>
                    <BookMarkOrDeleteEdit id={items.id} />
                </div>
                <div className=' flex flex-row justify-between px-2 py-2 '>
                    <Link href={`/product/${items.id}`}><b>{items.name}</b></Link>
                    <div >
                        <div className=' text-mainColor '>Rs.{Number(items.price) - items?.discount / 100 * Number(items.price)}</div>
                        <div className='text-[10px] relative bottom-1 text-end '>Rs.{items.price}</div>
                    </div>
                </div>
                <div className=' flex flex-row justify-between px-2 py-2 '>
                    <div className='text-gray-400 text-sm '><Link href={`/product/${items.id}`} >Learn More</Link></div>
                </div>
            </section>
        )
    )
}

export default IndvProduct