import prisma from "@/app/libs/prismadb";

interface IParams{
    listingId?: string
}
export const getListingById = async(
    params: Promise<IParams>
)=>{
    try {
        const {listingId} =await params
        if(!listingId || typeof listingId !== "string"){
            throw new Error("invalid ID!")
        }

        const listing = await prisma.listing.findUnique({
            where:{
                id: listingId
            },
            include:{
                user: true
            }
        })
        if(!listing){
            return null
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user:{
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString() ,
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error)
    }
}