import Link from 'next/link';
import { FaPowerOff } from 'react-icons/fa'; // Import the icon from react-icons
import NavLinks from './nav-links';
import { Button } from '../button';
import LogOutDash from './LogOutDash';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-mainColor p-4 md:h-40"
                href="/dashboard"
            >
                <div className="w-32 text-white text-xl md:w-40">
                    <div></div>
                    <span>STREET WARE</span>
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

                <Link href="/" >
                    <Button className='w-[100%] '>Client</Button>
                </Link>
                <LogOutDash />
            </div>
        </div>
    );
}
