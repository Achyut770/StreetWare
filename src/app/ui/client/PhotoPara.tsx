import Image from 'next/image'
import React from 'react'

const PhotoPara = () => {
    return (
        <section className='py-20 bg-slate-200'>
            <div className='w-[95%] mx-auto flex flex-col lg:flex-row items-center  lg:justify-between gap-7'>
                <div className='w-[90%] lg:w-1/2'>
                    <Image
                        alt="Image"
                        src="/image2.avif"
                        width={800}
                        height={400}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className='flex flex-col gap-4  justify-center w-4/5 lg:w-1/2'>
                    <b className='text-3xl md:text-4xl'>Elevate Your Streetwear Game</b>
                    <div>Discover the latest in urban fashion, where bold designs meet unparalleled comfort. Our collection is crafted to bring you the freshest styles, straight from the streets, blending contemporary aesthetics with everyday wearability. Each piece is made with high-quality materials, ensuring you look and feel your best wherever you go. Elevate your streetwear game with clothing that speaks to both modern trends and timeless style.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PhotoPara