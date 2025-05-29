import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/action/getCurrentUser";
import { SafeUser } from "@/app/type";

interface IParams{
    listingId: string
}
export const POST =async (request: Request, 
    {params}:{params: IParams}
) =>{
    const curUser = await getCurrentUser() as SafeUser

    const {listingId} = await params;
    if(!listingId || typeof listingId !== "string"){
        throw new Error("invalid ID")
    }

    let favoriteIds = [...(curUser.favoriteIds ||[])] 
    favoriteIds.push(listingId)

    const user = await prisma.user.update({
        where:{
            id: curUser.id
        },
        data:{
            favoriteIds
        }
    })
    return NextResponse.json(user)
}

export const DELETE = async (request: Request, 
    {params}:{params: IParams}
)=>{
    const curUser = await getCurrentUser() as SafeUser

    const {listingId} = await params;
    if(!listingId || typeof listingId !== "string"){
        throw new Error("invalid ID")
    }

    let favoriteIds = [...(curUser.favoriteIds ||[])] 
    favoriteIds = favoriteIds.filter((id)=> id !== listingId)
    
    const user = await prisma.user.update({
        where:{
            id: curUser.id
        },
        data:{
            favoriteIds
        }
    })
    return NextResponse.json(user)
}