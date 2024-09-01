'use client';

import { FaHome, FaUsers, } from 'react-icons/fa';
import { MdProductionQuantityLimits } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/dashboard', icon: FaHome },
    {
        name: 'Product',
        href: '/dashboard/product',
        icon: MdProductionQuantityLimits,
    },
    {
        name: 'Users',
        href: '/dashboard/user',
        icon: FaUsers
    }
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-mainColor md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-mainColor': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6 text-xl" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
