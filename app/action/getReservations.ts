import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams{
    listingId?: string
    userId?: string
    authorId?: string
}
export const getReservations = async(
    params: IParams
) =>{
    try {
        const {listingId, userId, authorId} = await params;
        const query: any = {}
        if(listingId){
            query.listingId = listingId
        }
        if(userId){
            query.userId = userId
        }
        if(authorId){
            query.listing = {userId: authorId}
        }
        const resers = await prisma.reservation.findMany({
            where:query,
            include:{
                listing: true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
      
        const reservations = resers.map((item)=>({
                ...item, 
                createdAt: item.createdAt.toISOString(),
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                listing:{
                    ...item.listing,
                    createdAt: item.listing.createdAt.toISOString()
                }
            
        }))
        return reservations
    } catch (error: any) {
        throw new Error(error)
    }
}