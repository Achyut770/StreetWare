import User from '@/app/modals/user';
import dbConnect from '@/app/utils/dbConn';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Connect to the database
        await dbConnect();

        const data = await req.json();
        const { email, name } = data;

        // Check if the user already exists
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            // User already exists, return a success message
            return NextResponse.json({ message: 'User already exists' }, { status: 200 });
        }

        // Create a new user
        const newUser = new User({ email, name });
        await newUser.save();

        return NextResponse.json({ message: 'User successfully registered' }, { status: 200 });
    } catch (err) {
        console.error('Error processing request:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
