import { getCurrentUser } from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams{
    reservationId?: string
}
export const DELETE =async (request: Request,
    {params}:{params:IParams}
) =>{
    const curUser = await getCurrentUser()
    if(!curUser){
        return NextResponse.error()
    }
    const {reservationId} = await params;

    if(!reservationId || typeof reservationId !== "string"){
        throw new Error("invalid ID")
    }
    const result = await prisma.reservation.deleteMany({
        where:{
            id: reservationId,
            OR:[
                {userId: curUser.id},
                {listing: {userId: curUser.id}}
            ]
        }
    })
    return NextResponse.json(result)
}