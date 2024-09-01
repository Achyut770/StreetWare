import React from 'react';

interface NoProductsProps {
    message?: string;
}

const NoProducts = ({ message = "No products available" }: NoProductsProps) => {
    return (
        <div className="flex items-center justify-center w-[100%] h-[70vh] bg-gray-50 px-3">
            <p className="text-3xl font-semibold text-mainColor ">{message}</p>
        </div>
    );
};

export default NoProducts;