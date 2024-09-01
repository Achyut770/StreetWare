"use client";

import { Button } from '../../button';
import React, { useRef, FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY as string;

const Contact_Form = () => {
    const form = useRef<HTMLFormElement>(null);
    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;
        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
                publicKey: PUBLIC_KEY,
            });
            form.current.reset()
            toast.success("Message Successfully Sent")
        } catch (error) {
            console.log("Error", error)
            toast.error("Message Could Not Be Sent")

        }
    };

    return (
        <form ref={form} onSubmit={sendEmail} className="space-y-8">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow-sm bg-bgInput border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                    placeholder="johndoe@streetware.com"
                    required
                />
            </div>
            <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="block p-3 w-full text-sm text-gray-900 bg-bgInput rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 "
                    placeholder="Let us know how we can help you"
                    required
                />
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                    Your message
                </label>
                <textarea
                    id="message"
                    name="message"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-bgInput rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                    placeholder="Leave a comment..."
                ></textarea>
            </div>
            <Button
                type="submit"
                className='mx-auto'
            >
                Send message
            </Button>
        </form>
    );
}

export default Contact_Form;
