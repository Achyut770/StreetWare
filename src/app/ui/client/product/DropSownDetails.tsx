"use client"
import React, { ReactElement, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import clsx from 'clsx';

interface ShippingOption {
    title: string;
    description: string;
    icon: ReactElement;
}

const DropSownDetails = ({ items, isLast }: { items: ShippingOption, isLast?: boolean }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div
            className={clsx(
                'py-4  cursor-pointer w-100% md:w-[70%]',
                isLast ? 'border-y' : 'border-t',
                'border-gray-500'
            )}
            onClick={() => setShowDetails((x) => !x)}
        >
            <div className='flex flex-row px-2 justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                    <div>{items.icon}</div>
                    <span>{items.title}</span>
                </div>
                <div>
                    <RiArrowDropDownLine className='text-2xl' />
                </div>
            </div>
            {showDetails && <div className='px-2 text-sm mt-2 text-gray-500'>{items.description}</div>}
        </div>
    )
}

export default DropSownDetails;
