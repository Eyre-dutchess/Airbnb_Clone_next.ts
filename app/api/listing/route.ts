import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/action/getCurrentUser";
import { SafeUser } from "@/app/type";

export const POST =async (request: Request) =>{
    const resp = await request.json();
    
    const curUser = await getCurrentUser() as SafeUser
    if(!curUser)return;
   
    const {category, location, guestCount, roomCount, bathCount, imgSrc, price, title, description} = resp;
    Object.keys(resp).forEach((value: any)=>{
        if(!resp[value]){
            NextResponse.error()
        }
    })
    const result = await prisma.listing.create({
        data:{
            category,  guestCount, roomCount, bathCount, imgSrc,title, description,
            locationValue:location.value, 
            price: parseInt(price, 10), 
            userId: curUser.id
        }
    })

    return NextResponse.json(result)
}