import { NextResponse } from "next/server";

export async function GET() {
    console.log("Server Server var:", process.env.SERVER_VAR);
    console.log("Server Browser var:", process.env.NEXT_PUBLIC_BROWSER);
    console.log("Server Message var:", process.env.NEXT_PUBLIC_MESSAGE);

    return NextResponse.json({
        browserVar: process.env.NEXT_PUBLIC_BROWSER,
        messageVar: process.env.NEXT_PUBLIC_MESSAGE,
        serverVar: process.env.SERVER_VAR, // передаємо серверну в клієнт через API
    });
}
