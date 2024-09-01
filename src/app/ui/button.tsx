"use client"
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';
import { LuLoader2 } from 'react-icons/lu';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
    const { pending } = useFormStatus()
    return (
        <button
            disabled={pending}
            {...rest}
            className={clsx(
                'flex h-10 items-center rounded-lg bg-mainColor px-4 text-sm font-medium text-white transition-colors hover:bg-bgHoverButton focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor active:bg-bgActiveButton aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {pending ? <LuLoader2 className='animate-spin' />
                : children}
        </button>
    );
}
