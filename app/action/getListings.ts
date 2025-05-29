import prisma from "@/app/libs/prismadb";

export interface IListingParams{
    userId?: string
    category?: string
    location?: string
    roomCount?: number
    guestCount?: number
    bathCount?: number
    startDate?: string
    endDate?: string
}
export const getListings = async (
    params: IListingParams
) =>{
    try {
        const{
            userId,startDate, endDate,category,location,roomCount,guestCount,bathCount
        } = await params

        let query: any = {}
       
        if(userId){
            query.userId = userId
        }
        if(category){
            query.category = category
        }
        if(location){
            query.location = location
        }
        if(roomCount){
            query.roomCount = {
                gte: +roomCount
            }
        }
        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }
        if(bathCount){
            query.bathCount = {
                gte: +bathCount
            }
        }
        if(startDate && endDate){
            query.NOT={
                reservations:{
                    some:{
                        OR:[
                            {
                                endDate: {gte: startDate},
                                startDate:{lte: startDate}
                            },{
                                endDate: {gte: endDate},
                                startDate:{lte: endDate}
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where:query,
            orderBy:{
                createdAt: "desc"
            }
        })

        const SafeListings = listings.map((listing)=>{
            return {
                ...listing,
                createdAt: listing.createdAt.toISOString()
            }
        })
        return SafeListings
    } catch (error: any) {
        throw new Error(error)
    }   

}