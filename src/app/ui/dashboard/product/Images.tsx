"use client"
import { IProduct } from '@/app/modals/product'
import Image from 'next/image'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Images = ({ imageUrl }: { imageUrl: IProduct["imageUrl"] }) => {
    const [selectedImage, setSelectedImage] = useState<string>(imageUrl[0]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    }

    return (
        <div className="flex flex-col gap-3">
            {selectedImage && (
                <div>
                    <Image
                        src={selectedImage}
                        height={100}
                        width={500}
                        alt={"Selected Image"}
                        className='w-[100%] mx-auto'
                    />
                </div>
            )}
            <Swiper
                slidesPerView={4}
                pagination={{
                    clickable: true,
                }}
                className='flex flex-row gap-2 w-full'
            >
                {imageUrl.map((item, index) => (
                    <SwiperSlide
                        key={index}
                    >
                        <Image
                            src={item}
                            height={120}
                            width={150}
                            alt={"Images"}
                            className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:h-[120px] lg:w-[150px] cursor-pointer ml-2 md:mx-0"
                            onClick={() => handleImageClick(item)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    )
}

export default Images;
