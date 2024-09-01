import { AuthError } from "next-auth";
import User from "../modals/user";
import dbConnect from "../utils/dbConn";
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/sendEmail";

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
export const REFRESH_SECRET = process.env.NEXT_PUBLIC_REFRESH_SECRET as string;
const expiringTime = 15
export const createAccessTokenFromRefreshToken = async (refreshToken: string) => {
    await dbConnect()
    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;
        const user = User.findById(decoded.id)
        if (!user) {
            throw new Error("User Doesnot Exist")
        }

        const newAccessToken = generateAccessToken({
            _id: decoded.id.toString()
        });

        return {
            accessToken: newAccessToken,
            expiresAt: expiringTime * 60,
        };
    } catch (err) {
        console.error('Failed to create access token from refresh token:', err);
        throw new Error('Invalid refresh token');
    }
};

export const generateAccessToken = (user: { _id: string }) => {
    return jwt.sign(
        {
            id: user._id,

        },
        JWT_SECRET,
        { expiresIn: `${expiringTime}min` }
    );
};

const generateRefreshToken = (user: { _id: string }) => {
    return jwt.sign(
        {
            id: user._id,
        },
        REFRESH_SECRET,
        { expiresIn: '30d' }
    );
};


export const getTokensAndUser = async (email: string) => {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }

    if (!user.isVerified) {
        const expiryDate = user.verifyTokenExpiryDate;
        if (expiryDate && expiryDate.getTime() > Date.now()) {
            throw new AuthError(`User Not Verified Plz use the link sent to  ${user.email}  to verify `);
        } else {
            await sendEmail({ email: user.email, emailType: "VERIFY", userId: user.id })
            throw new AuthError(`User Not Verified sent new verification link to ${user.email} `);

        }
    }


    const userWithStringId = {
        _id: user.id.toString(),
    };

    const accessToken = generateAccessToken(userWithStringId);
    const refreshToken = generateRefreshToken(userWithStringId)
    const expires_at = (Date.now() + expiringTime * 60 * 1000) / 1000
    return { accessToken, user, refreshToken, expires_at };
};