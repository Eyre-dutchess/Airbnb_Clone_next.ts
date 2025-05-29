
import prisma from "@/app/libs/prismadb";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const POST =async (request: Request) =>{
    const resp = await request.json()

    const {name, email, password, imgSrc} = resp
    const hashedPassword = await bcryptjs.hash(password, 12)

    const result = await prisma.user.create({
        data:{
            name, email, hashedPassword, image: imgSrc
        }
    })
    return NextResponse.json(result)
}