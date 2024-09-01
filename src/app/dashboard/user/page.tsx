import { getAllUsers } from '@/app/lib/userActions'
import React from 'react'
import UserIndv from '@/app/ui/client/user/user'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'User',
};


const Page = async () => {
    const users = await getAllUsers()
    if (!users) return
    return (
        <section className='flex flex-col gap-10  mx-auto'>
            <b className='text-2xl' >User Management </b>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <UserIndv items={user} key={user.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Page