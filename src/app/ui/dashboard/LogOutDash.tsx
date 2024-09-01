"use client"
import { logOut } from '@/app/lib/userActions'
import { useRouter } from 'next/navigation'
import { FaPowerOff } from 'react-icons/fa'

const LogOutDash = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await logOut();
        router.push("/login")
    };
    return (
        <form action={handleLogout}>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-mainColor md:flex-none md:justify-start md:p-2 md:px-3">
                <FaPowerOff className="w-6 text-xl" /> {/* Use the imported icon */}
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>)
}

export default LogOutDash