import prisma from "@/app/libs/prismadb"
import { getCurrentUser } from "./getCurrentUser"

export const getFavorites = async() =>{
    try {
       const curUser = await getCurrentUser()
       if(!curUser) return null;
       
        const favorites = await prisma.listing.findMany({
            where:{
                id: {
                    in: [...(curUser.favoriteIds || [])]
                }
            }
        })
        const safeFavorites = favorites.map((favo)=>({
            ...favo,
            createdAt: favo.createdAt.toISOString()
        }))
        return safeFavorites
    } catch (error: any) {
        throw new Error(error)
    }
}