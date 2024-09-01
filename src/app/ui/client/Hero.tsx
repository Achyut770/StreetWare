import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../button'

const Hero = () => {
    return (
        <section className='relative text-white overflow-hidden'>
            <div className="relative h-[89vh] w-[100vw] bg-black">
                <Image
                    src="/hero.avif"
                    alt="Description of the image"
                    layout="fill"
                    objectFit="cover"
                    className="object-cover opacity-85 "
                />
            </div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                <p className="mb-4">Street Ware</p>
                <h1 className=" w-[98vw] text-2xl sm:text-4xl lg:text-5xl from-neutral-600 mb-4">Industrial Design Meets Fashion</h1>
                <Link href="/product" className="w-28 mx-auto block" >
                    <Button className='rounded-none '>
                        Shop Now
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default Hero
