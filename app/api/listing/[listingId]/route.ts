import { getCurrentUser } from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams{
    listingId?: string
}
export const DELETE = async(request:Request,
    {params}:{params:IParams}
)=>{
    try {
        const curUser = await getCurrentUser()
        if(!curUser){
            return NextResponse.error()
        }
       const {listingId} = await params;
       if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID")
       } 

       const result = await prisma.listing.deleteMany({
            where:{
                id: listingId,
                userId: curUser.id
            }
       })
       return NextResponse.json(result)
    } catch (error:any) {
        throw new Error(error)
    }
}