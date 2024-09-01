import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name?: string;
    email: string;
    password?: string;
    role: 'admin' | 'user'; // Role property added
    createdAt: Date;
    isVerified: boolean;
    forgetPasswordToken?: string;
    forgetPasswordTokenExpiryDate?: Date;
    verifyToken?: string;
    verifyTokenExpiryDate?: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: false,
            minlength: 8,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
            required: true
        },
        forgetPasswordToken: String,
        forgetPasswordTokenExpiryDate: Date,
        verifyToken: String,
        verifyTokenExpiryDate: Date,
        isVerified: Boolean
    },
    {
        timestamps: true,
    }
);

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
