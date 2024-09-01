"use client"
import { updateProduct } from '@/app/lib/productactions';
import { State } from '@/app/lib/types';
import { IProduct } from '@/app/modals/product';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FaUpload } from "react-icons/fa6";
import { Button } from '../../button';
import Editor from './editor';
import { toast } from 'react-toastify';
import { useCurrentSession } from '@/app/hooks/useCurrentSession';

const EditProductForm = ({ product, id }: { product: IProduct, id: string }) => {
    const initialState: State = { message: null, errors: {} };
    const { session } = useCurrentSession()
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [dataBaseImages, setDataBaseImages] = useState(product.imageUrl)
    const bindCreateProduct = updateProduct.bind(null, session?.user.token || "", id, dataBaseImages)
    const [state, formAction] = useFormState(bindCreateProduct, initialState);
    const [description, setDescription] = useState(product.description);
    console.log("Token", session?.user.token)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages((x) => [...filesArray, ...x]);
        }
    };
    const handleImageRemove = (index: number) => {
        setSelectedImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            return updatedImages;
        });
    };

    const handleSubmit = async (formData: FormData) => {
        selectedImages.forEach((file, index) => {
            formData.append(`image_${index}`, file);
        });
        formData.append("description", description)
        formAction(formData)
    }

    const handleDataBaseImageRemove = (index: number) => {
        setDataBaseImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            return updatedImages;
        });
    };

    const { pending } = useFormStatus();

    useEffect(() => {
        if (state.message) {
            if (!state.success) {
                toast.error(state.message)
            }
        }
    }, [state])



    return (
        <form action={handleSubmit} className="shadow-product bg-white rounded-md p-4 my-4 flex flex-col gap-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    defaultValue={product.name}
                />
                {state?.errors?.name && <div className='text-red-500 mt-1'> {state?.errors?.name[0]} </div>}
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    defaultValue={product.price}

                />
                {state?.errors?.price && <div className='text-red-500 mt-1'> {state?.errors?.price[0]} </div>}

            </div>
            <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                    Discount
                </label>
                <input
                    type="number"
                    id="discount"
                    name="discount"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                    defaultValue={product.discount}
                />
                {state?.errors?.discount && <div className='text-red-500 mt-1'> {state?.errors?.discount[0]} </div>}

            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <Editor description={description} setDescription={setDescription} />
                {state?.errors?.description && <div className='text-red-500 mt-1'> {state?.errors?.description[0]} </div>}
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Upload Images
                    <FaUpload className='text-4xl w-20 mt-2 cursor-pointer' />
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                />
            </div>

            {state?.errors?.image && <div className='text-red-500 mt-1'> {state?.errors?.image} </div>}

            <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Selected Images</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedImages.map((image, index) => (
                        <div key={index} className="relative">
                            <Image
                                width={100}
                                height={100}
                                src={URL.createObjectURL(image)}
                                alt={`Selected ${index}`}
                                className="w-24 h-24 object-cover rounded-md border border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => handleImageRemove(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                                &#x2716;
                            </button>
                        </div>
                    ))}
                    {dataBaseImages.map((image, index) => (
                        <div key={index} className="relative">
                            <Image
                                width={100}
                                height={100}
                                src={image}
                                alt={`Selected ${index}`}
                                className="w-24 h-24 object-cover rounded-md border border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => handleDataBaseImageRemove(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                                &#x2716;
                            </button>
                        </div>
                    ))}

                </div>
            </div>

            <Button type='submit' className='mx-auto px-10'>Edit</Button>
        </form>
    );
};

export default EditProductForm;
