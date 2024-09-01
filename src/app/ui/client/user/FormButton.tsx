"use client"
import { useCurrentSession } from '@/app/hooks/useCurrentSession'
import { State } from '@/app/lib/types'
import { logOut, toggleUserRole } from '@/app/lib/userActions'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

const FormButton = ({ role, id }: { role: string, id: string }) => {
    const initialState: State = { message: null, errors: {} };
    const { session } = useCurrentSession()
    const bindToogleUser = toggleUserRole.bind(null, id, session?.user.token || "Always true")
    const [state, formAction] = useFormState(bindToogleUser, initialState)

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                console.log("Callsed")
                toast.success(state.message)
                if (session?.user.id === id) {
                    logOut()
                }
            } else {
                toast.error(state.message)
            }
        }
    }, [state, session?.user.id, id])
    return (
        <form action={formAction} >
            <button
                className={clsx("px-4 py-2 rounded text-white", { "bg-red-500 hover:bg-red-600": role === "admin" }, { "bg-green-500 hover:bg-green-600": role === "user" })}
            >
                {role === "admin" ? "Demote to User" : "Promote to Admin"}
            </button>
        </form>
    )
}

export default FormButton