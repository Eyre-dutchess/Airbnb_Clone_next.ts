import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/action/getCurrentUser";
import { SafeUser } from "@/app/type";


export const POST =async (request: Request) =>{
   
    const curUser = await getCurrentUser() as SafeUser
    if(!curUser){
        return NextResponse.error()
    }
    const resp = await request.json();
    const {totalPrice, startDate,endDate,listingId} = resp

    if(!listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error()
    }
    const listingAndReservation = await prisma.listing.update({
        where:{
            id: listingId
        },
        data:{
            reservations:{
                create:{
                    totalPrice, startDate,endDate,
                    userId: curUser.id
                }
            }
           
        }
    })

    return NextResponse.json(listingAndReservation)
}