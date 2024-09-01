"use server"
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import User, { IUser } from "../modals/user";
import dbConnect from "../utils/dbConn";
import { isAdmin } from "../utils/isAdmi";
import { State, UserSchema } from "./types";
import { sendEmail } from "../utils/sendEmail";



export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            console.log(error.type)
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    const result = error.message.split('. ')[0];
                    return result;
            }

        }

        throw error
    }
}

export async function logOut() {
    try {
        await signOut()
    } catch (error) {
        throw error
    }
}

export async function SignUp(state: State, formData: FormData): Promise<State> {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirm_password = formData.get("confirm_password")

    const validatedFields = UserSchema.safeParse({
        name,
        email,
        password
    })

    if (!validatedFields.success) {
        return {
            message: "Form Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    if (password !== confirm_password) return {
        errors: {
            confirm_password: ["Password Didn't Match"]
        }
    }
    let redirectPath;
    try {
        await dbConnect();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                errors: {
                    already_exist: ["User Already Exist , Try With differerent Email"]
                }
            }
        }

        const newUser = new User({
            name,
            email,
            password,
        });
        const saveUser = await newUser.save();
        await sendEmail({ email: email as string, emailType: "VERIFY", userId: saveUser.id })
        redirectPath = "/login"
        revalidatePath("/dashboard/user")
        return { message: null }
    } catch (error) {
        redirectPath = "/signup"
        return {
            message: "SomeThing Went Wrong"
        }
    } finally {
        if (redirectPath)
            redirect(redirectPath)
    }
}

export async function getAllUsers(): Promise<IUser[]> {
    await dbConnect();
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
}

export async function toggleUserRole(userId: string, token: string): Promise<State> {
    await dbConnect();
    try {
        const admin = await isAdmin(token)
        if (!admin) {
            return {
                message: `You are not Admin `,
                success: false
            };
        }
        const user = await User.findById(userId);
        if (!user) {
            return {
                message: `User cannot be found `,
                success: false
            };
        }

        user.role = user.role === "admin" ? "user" : "admin";
        await user.save();
        revalidatePath("/dashboard/user")
        return {
            message: `Succefully Changed Role `,
            success: true
        };

    } catch (error) {
        return {
            message: `Cant change Role `,
            success: false
        };
    }
}

export async function verifyEmail(token: string, state: State, formData: FormData): Promise<State> {
    await dbConnect()
    let redirectPath;
    try {
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiryDate: { $gt: Date.now() } });

        if (!user) {
            return {
                message: "Invalid Token",
                success: false
            }
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiryDate = undefined;
        await user.save();
        redirectPath = "/login"
        return { message: "Succcessfull", success: true }
    } catch (error) {
        return { message: "Something Went Wromg", success: false }
    } finally {
        if (redirectPath)
            redirect(redirectPath)
    }
}