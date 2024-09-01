"use client"
import { useEffect, useState } from 'react';

export default function ChangeColor() {
    const [theme, setTheme] = useState('blue');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'blue';
        setTheme(savedTheme);
        document.body.classList.add(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'blue' ? 'red' : 'blue';
        setTheme(newTheme);
        document.body.classList.remove(theme);
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="fixed bottom-[10px] right-[20px] z-30">
            <button
                className={`w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 focus:outline-none ${theme === 'red' ? 'bg-redMain' : 'bg-blueMain'
                    }`}
                onClick={toggleTheme}
            >
                <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${theme === 'red' ? 'translate-x-8' : ''
                        }`}
                />
            </button>
        </div>
    );
}
