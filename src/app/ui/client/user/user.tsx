import { IUser } from '@/app/modals/user'
import clsx from 'clsx'
import React from 'react'
import FormButton from './FormButton'

const UserIndv = ({ items }: { items: IUser }) => {
    return (
        <tr key={items.id}>
            <td className="px-6 py-4 whitespace-nowrap">{items.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{items.email}</td>
            <td className={clsx("px-6 py-4 whitespace-nowrap", { "text-green-500 hover:text-green-600": items.role === "admin" }
                , { "text-red-500 hover:text-red-600": items.role === "user" }
            )}>{items.role}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <FormButton id={items.id} role={items.role} />
            </td>
        </tr>)
}

export default UserIndv