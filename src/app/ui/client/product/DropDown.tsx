import React from 'react';
import DropSownDetails from './DropSownDetails';
import { MdOutlineLocalShipping, MdAssignmentReturned } from 'react-icons/md';

const shippingOptions = [
    {
        title: "Shipping",
        description: "We offer fast and reliable shipping. All orders are processed within 2-3 business days. You will receive a tracking number once your order has been shipped.",
        icon: <MdOutlineLocalShipping />
    },
    {
        title: "Returns",
        description: "Our return policy allows you to return items within 30 days of receipt. Items must be in their original condition. Please contact our support team for return instructions.",
        icon: <MdAssignmentReturned />
    },


];

const DropDownList = () => {
    return (
        <div className='mt-6'>
            {shippingOptions.map((option, index) => (
                <DropSownDetails
                    key={index}
                    items={option}
                    isLast={index === shippingOptions.length - 1}
                />
            ))}
        </div>
    );
}

export default DropDownList;
