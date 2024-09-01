"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Symon Gurung",
            image: "/tetimonal1.jpg",
            description:
                "Sentry Oak's gear is a game changer. Their pieces fit like they were made for me and turn heads everywhere I go.",
        },
        {
            name: "Kritika Pandey",
            image: "/testimonal2.jpg",
            description:
                "I've been rocking Sentry Oak for a while now, and their threads never disappoint. Top-notch style and comfort every time.",
        },
        {
            name: "Anil Tamang",
            image: "/testimonal4.jpg",
            description:
                "Sentry Oak has got my back with the freshest fits. Their designs are on point, and the quality is unbeatable.",
        },
    ];

    return (
        <section className="w-[95%] mx-auto flex flex-col gap-10">
            <div className="text-center">
                <div className="text-xl">Testimonal</div>
                <b className="text-3xl">What our clients say about us.</b>
            </div>
            <Swiper
                className="w-full h-auto mx-auto "
                breakpoints={{
                    600: { slidesPerView: 1, spaceBetween: 20 },
                    900: { slidesPerView: 2, spaceBetween: 30 },
                    1200: { slidesPerView: 3, spaceBetween: 40 },
                }}
                pagination={{
                    clickable: true,
                }}
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex flex-col items-center p-5 shadow-testimonal  my-2 "
                    >
                        <div className="text-[12px] my-5 text-center">{item.description}</div>
                        <div className="w-[100px] h-[2px] bg-gray-400 my-5 mx-auto"></div>
                        <Image
                            src={item.image}
                            height={100}
                            width={100}
                            alt={item.name}
                            className="rounded-full w-[60px] h-[60px] my-5 mx-auto"
                        />
                        <div className="my-5 text-center text-gray-400">{item.name}</div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex flex-col gap-3 items-center">
                <b>No two styles are alike!</b>
                <div className="text-[12px] text-center">Our exclusive collection, tailored to your unique style, ensures every piece fits perfectly with your personal look.</div>
            </div>
        </section>
    );
}
