"use server"

import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Cart from "../modals/addToCart";
import { State } from "./types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "../utils/dbConn";
import ProductModel from "../modals/product";
import { JWT_SECRET } from './userAuth';


export async function addToCart(token: string, productId: mongoose.Types.ObjectId, state: State, formData: FormData): Promise<State> {
    try {
        await dbConnect()
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: mongoose.Types.ObjectId };

        // Extract userId from the decoded token
        const userId = decoded.id;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }] // Add with quantity 1
            });
        } else {
            // If the cart exists, check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

            if (itemIndex > -1) {
                // If the product is already in the cart, increase the quantity by 1
                cart.items[itemIndex].quantity += 1;
            } else {
                // If the product is not in the cart, add it with quantity 1
                cart.items.push({ productId, quantity: 1 });
            }
        }

        // Save the cart and return the updated cart
        await cart.save();
        revalidatePath("/")
        revalidatePath("/cart")
        revalidatePath("/product")
        return {
            message: "Added To Cart",
            success: true
        };
    } catch (error) {
        console.error(error);
        return {
            message: "Some Thing went wrong "
        }
    }
}

export async function getCartByToken(token: string | undefined) {
    if (!token) return;
    try {
        await dbConnect();

        const decoded = jwt.verify(token, JWT_SECRET) as { id: mongoose.Types.ObjectId };
        const id = decoded.id;
        const cart = await Cart.findOne({ userId: id });

        if (!cart) {
            return [];
        }
        // Validate that each item in the cart still exists in the ProductModel
        const validItems = [];
        for (const item of cart.items) {
            const product = await ProductModel.findById(item.productId);
            if (product) {
                validItems.push(item);
            }
        }

        // If there were invalid items, update the cart in the database
        if (validItems.length !== cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        return validItems;
    } catch (error) {
        console.log("Error", error);
        return [];
    }
}

export async function removeProductFromCart(token: string, productId: string, state: boolean, formData: FormData) {
    try {
        await dbConnect()

        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: mongoose.Types.ObjectId };

        const userId = decoded.id;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return false
        }

        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);

            await cart.save();

            revalidatePath("/cart")
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
        return false
    }
    finally {
        redirect("/cart")
    }
}

export async function updateCartQuantity(
    token: string,
    productId: string,
    newQuantity: number
) {
    try {
        await dbConnect()
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: mongoose.Types.ObjectId };

        // Extract userId from the decoded token
        const userId = decoded.id;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return;
        }

        // Check if the product is in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

        if (itemIndex > -1) {
            // If the product is in the cart, update its quantity
            if (newQuantity <= 0) {
                // If the new quantity is 0 or less, remove the product from the cart
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = newQuantity;
            }

            // Save the updated cart
            await cart.save();
            revalidatePath("/cart")
        }
    } catch (error) {
        console.error(error);
    } finally {
        redirect("/cart")
    }
}

export async function getTotalQuantity(token: string) {
    try {
        await dbConnect();
        const decoded = jwt.verify(token, JWT_SECRET) as { id: mongoose.Types.ObjectId };
        const userId = decoded.id;

        const cart = await Cart.findOne({ userId });

        if (!cart) return 0;

        const totalPrice = await Promise.all(
            cart.items.map(async (item) => {
                const product = await ProductModel.findById(item.productId);
                if (!product) return 0;

                const discountedPrice = product.price - (product.price / 100) * product.discount;
                return discountedPrice * item.quantity;
            })
        );

        return totalPrice.reduce((acc, curr) => acc + curr, 0);
    } catch (error) {
        console.error("error", error);
        return 0;
    }
}
