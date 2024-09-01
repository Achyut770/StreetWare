"use client";
import { useCurrentSession } from "@/app/hooks/useCurrentSession";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "../button";
import NavLinks from "./nav-links";
import { logOut } from "@/app/lib/userActions";

const Navbar = () => {
    const [res, setRes] = useState(true)

    const changeRes = () => {
        setRes((prevRes) => !prevRes)
    }
    const router = useRouter()


    const { session, status } = useCurrentSession();

    const isAdmin = session?.user?.role === "admin"
    const isLoggedIn = session?.user
    const handleLogOut = async () => {
        await logOut()
        router.push("/login")
    }

    return (
        <nav className="flex justify-between items-center px-4 py-4 shadow-product md:px-8 lg:px-14">
            <Link href="/" className="w-1/3">
                <Image src={"/logo.png"} width={140} height={50} alt="Logo" />
            </Link>
            <div
                className={clsx(
                    "flex z-20 gap-5 px-5 py-2 top-[60px] sm:top-[70px] left-0 bg-white w-full absolute flex-col md:relative md:top-0 md:flex-row md:gap-8 md:w-2/3",
                    { "hidden md:flex": res }
                )}
            >
                <NavLinks changeRes={changeRes} />
            </div>
            <div className="flex flex-row gap-2 justify-end items-center w-2/3 md:gap-4 lg:gap-6">
                {!isLoggedIn ? (
                    <Link href="/login" className="flex items-center hover:text-mainColor">
                        LogIn
                    </Link>
                ) : (
                    <form action={handleLogOut}>
                        <button className="text-sm md:text-[16px] hover:text-mainColor">
                            SignOut
                        </button>
                    </form>
                )}
                {isLoggedIn && <Link href="/cart" className="flex md:text-2xl items-center">
                    <MdOutlineShoppingCart />
                </Link>}
                {isAdmin && (
                    <Link href="/dashboard" className={clsx("absolute z-20 top-[220px] sm:top-[240px] left-[0px] w-full px-5  bg-white py-4 md:py-0 md:w-auto  md:relative md:top-0 ", { " hidden md:flex": res })}>
                        <Button className="h-9">Admin</Button>
                    </Link>
                )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                    className="pl-5 text-2xl text-gray-700 hover:text-mainColor focus:outline-none"
                    onClick={changeRes}
                >
                    <RxHamburgerMenu />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
