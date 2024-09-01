import React from 'react'
import { Button } from '../button'
import Link from 'next/link'

const RichText = () => {
    return (
        <section className='py-20 bg-slate-200'>
            <div className='flex flex-col gap-10 justify-center items-center w-[95%] lg:w-[80%] mx-auto'>
                <div className='text-4xl text-center'>Redefine Your Style</div>
                <div className='text-center text-gray-500'>Explore the intersection of fashion and function, where every piece is crafted to elevate your look with unmatched comfort. Find styles that resonate with your unique sense of fashion, blending contemporary trends with timeless appeal.</div>
                <Link href={"/product"} ><Button className="rounded-[5px]" >Shop Now</Button> </Link>
            </div>
        </section>
    )
}

export default RichText