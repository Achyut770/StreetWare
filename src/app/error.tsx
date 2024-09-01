"use client";
import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Error = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <FaExclamationCircle className="text-mainColor text-5xl mb-3" />
            <h1 className="text-gray-800 text-3xl font-semibold">Something Went Wrong</h1>
            <p className="text-gray-600 text-lg mt-2">Please try again later.</p>
        </div>
    );
};

export default Error;
