import { z } from "zod";

export type State = {
    errors?: {
        name?: string[];
        price?: string[];
        description?: string[];
        discount?: string[];
        image?: string[];
        email?: string[];
        password?: string[];
        confirm_password?: string[];
        already_exist?: string[]
    };
    message?: string | null;
    success?: boolean
};


export const signUpSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});


export const ProductSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    discount: z.number().positive({ message: "Discount must be a positive number" }),
});

export const zod_password = z.string()
    .refine((password) =>
        password.length > 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
        {
            message: "Password must be 8+ chars, include upper, lower, number, and special character.",
        })

export const UserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: zod_password,
    role: z.enum(['admin', 'user']).default('user').optional(),
});

export const imageUrl = z.array(z.string().url({ message: "Each image URL must be a valid URL" })).nonempty({ message: "At least one image URL is required" })


export type ProductInput = z.infer<typeof ProductSchema>;
