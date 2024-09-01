'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Home', href: '/' },
    {
        name: 'Product',
        href: '/product',
    },
    { name: 'Contact Us', href: '/contactus' },
    { name: 'About Us', href: '/about' },
];

export default function NavLinks({ changeRes }: { changeRes: () => void }) {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "hover:text-mainColor",
                            { ' text-mainColor ': pathname === link.href }
                        )
                        }
                        onClick={changeRes}
                    >
                        <p className="block">{link.name}</p>
                    </Link >
                );
            })}
        </>
    );
}