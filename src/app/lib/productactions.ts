"use server"
import { UploadApiResponse } from 'cloudinary';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createReadStream } from 'streamifier';
import ProductModel, { IProduct } from '../modals/product';
import dbConnect from '../utils/dbConn';
import cloud from './cloudinary';
import { imageUrl, ProductSchema, State } from './types';
import { isAdmin } from '../utils/isAdmi';


const revalidatePaths = () => {
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/product")
    revalidatePath("/")
}


const uploadFileToCloud = async (one_image: File): Promise<UploadApiResponse | undefined> => {
    const arrayBuffer = await one_image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return new Promise((resolve, reject) => {
        const stream = cloud.uploader.upload_stream((error, result) => {
            if (error) return reject(error.message)
            resolve(result)
        })
        createReadStream(buffer).pipe(stream)
    })
}

export async function createProduct(token: string, state: State, formData: FormData): Promise<State> {
    await dbConnect()
    const admin = await isAdmin(token)
    if (!admin) {
        return {
            message: "You are not admin"
            , success: false
        }
    }
    // Extract and parse form data
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const description = formData.get("description") as string;
    const imageFiles: File[] = [];

    // Collect image files
    formData.forEach((value, key) => {
        if (key.startsWith('image_') && value instanceof File) {
            imageFiles.push(value);
        }
    });

    // Validate form fields
    const validatedFields = ProductSchema.safeParse({
        name,
        description,
        price,
        discount,
    });

    if (!validatedFields.success) {
        return {
            message: "Form Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    let redirectPath;
    // Upload images and validate URLs
    try {
        const imageURLPromises = imageFiles.map(async (file) => {
            const result = await uploadFileToCloud(file);
            return result?.secure_url || "";
        });

        const imageURLs = await Promise.all(imageURLPromises);
        const imagePass = imageUrl.safeParse(imageURLs);
        if (!imagePass?.success) {
            const imageError = imagePass.error.errors[0].message
            return {
                message: "Image Validation failed",
                errors: {
                    image: [imageError]
                }
            };
        }


        const product = new ProductModel({
            name,
            price,
            description,
            imageUrl: imageURLs,
            discount,
        });
        await product.save();
        redirectPath = "/dashboard/product"
        revalidatePaths()

        return {
            message: "Succesfully Added product",
            success: true
        };
    } catch (error) {
        console.error("Error:", error);
        redirectPath = "/dashboard/product/create"
        return {
            message: "Failed to Add",
            success: false
        };
    } finally {
        if (redirectPath)
            redirect(redirectPath);
    }
}

export async function updateProduct(token: string, id: string, dataBaseImages: string[], state: State, formData: FormData): Promise<State> {
    await dbConnect();

    const admin = await isAdmin(token)
    if (!admin) {
        return {
            message: "You are not admin"
            , success: false
        }
    }
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const description = formData.get("description") as string;
    const imageFiles: File[] = [];


    // Collect image files
    formData.forEach((value, key) => {
        if (key.startsWith('image_') && value instanceof File) {
            imageFiles.push(value);
        }
    });


    const validatedFields = ProductSchema.safeParse({
        name,
        description,
        price,
        discount,
    });

    if (!validatedFields.success) {
        return {
            message: "Form Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false
        };
    }
    let redirectPath;
    try {
        const imageURLPromises = imageFiles.map(async (file) => {
            const result = await uploadFileToCloud(file);
            return result?.secure_url || "";
        });

        const imageURLs = await Promise.all(imageURLPromises);
        const imagePass = imageUrl.safeParse([...imageURLs, ...dataBaseImages]);

        if (!imagePass?.success) {
            const imageError = imagePass.error.errors[0].message
            return {
                message: "Image Validation failed",
                errors: {
                    image: [imageError]
                }
            };
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid product ID');
        }
        await ProductModel.findByIdAndUpdate(id, {
            name,
            price,
            description,
            imageUrl: [...imageURLs, ...dataBaseImages],
            discount,
        }, {
            runValidators: true,
        }).exec();

        redirectPath = "/dashboard/product"
        revalidatePaths()

        return {
            message: "Succesfully Updated the product",
            success: true
        };

    } catch (error) {
        console.error('Error updating product:', error);
        redirectPath = `/dashboard/eidt/${id}`

        return { message: 'Failed to update product', success: false };
    } finally {
        if (redirectPath)
            redirect(redirectPath)
    }
}

export async function paginateProducts(page: number, itemsPerPage: number, searchTerm = "") {
    const pageNumber = Math.max(1, page);
    const searchRegex = new RegExp(searchTerm, 'i');

    try {
        await dbConnect();

        const products = await ProductModel.find({
            name: { $regex: searchRegex }
        })
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec();

        return products as unknown as IProduct[]
    } catch (error) {
        console.error('Error fetching paginated products:', error);
        throw new Error('Failed to fetch products');
    }
}

export async function fetchProductById(id: string | undefined) {
    await dbConnect();

    if (!id) return
    if (!mongoose.isValidObjectId(id)) {
        return
    }
    await dbConnect();
    const product: IProduct | undefined = await ProductModel.findById(id).exec();
    if (!product) {
        return
    }
    return product;
}


export async function getProductCount(query: Record<string, any>): Promise<number> {
    await dbConnect();

    try {
        if (typeof query !== 'object' || Array.isArray(query)) {
            throw new Error('Invalid query');
        }
        await dbConnect();

        const count = await ProductModel.countDocuments(query).exec();

        return count;
    } catch (error) {
        console.error('Error getting product count:', error);
        throw new Error('Failed to get product count');
    }
}

export async function countProductsContainingSubstring(substring: string): Promise<number> {
    await dbConnect();

    try {
        const regex = new RegExp(substring, 'i');
        await dbConnect();

        const count = await ProductModel.countDocuments({ name: { $regex: regex } }).exec();

        return count;
    } catch (error) {
        console.error('Error counting products containing substring:', error);
        throw new Error('Failed to count products');
    }
}

export async function deleteProduct(token: string, productId: string, state: State, formData: FormData): Promise<State> {
    await dbConnect();

    const admin = await isAdmin(token)
    if (!admin) {
        return {
            message: "You are not admin"
            , success: false
        }
    }
    try {
        const result = await ProductModel.findByIdAndDelete(productId);
        if (!result) {
            return { success: false, message: 'Product not found' };
        }
        revalidatePaths()
        return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, message: 'Error deleting product' };
    }
}


