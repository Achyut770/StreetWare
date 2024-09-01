import { createAccessTokenFromRefreshToken } from '@/app/lib/userAuth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { refreshToken } = data;
        if (!refreshToken) {
            return NextResponse.json({ error: 'Missing refresh token' }, { status: 400 });
        }
        const { accessToken, expiresAt } = await createAccessTokenFromRefreshToken(refreshToken);
        return NextResponse.json({ access_token: accessToken, espires_in: expiresAt });
    } catch (err) {
        console.error('Error processing request:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
