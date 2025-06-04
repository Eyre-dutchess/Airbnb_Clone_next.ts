
import { getCurrentUser } from "./action/getCurrentUser";
import { getListings, IListingParams } from "./action/getListings";
import { ClientOnly } from "./components/ClientOnly";
import { Container } from "./components/Container";
import { EmptyState } from "./components/EmptyState";
import { ListingCard } from "./components/listing/ListingCard";


interface HomeParams{
     userId?: string
    category?: string
    location?: string
    roomCount?: number
    guestCount?: number
    bathCount?: number
    startDate?: string
    endDate?: string
}
export default async function Home(
  {params}:{params: Promise<HomeParams>}
  ){
  const curUser = await getCurrentUser() 
  const listings = await getListings(params)
 

  if(listings.length < 1){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
        <Container>
          <div className="relative pt-16 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3
                          2xl:grid-cols-4 gap-6">
              {listings.map((listing)=>{
                return <ListingCard key={listing.id} curUser={curUser} 
                data={listing}/>
              })}
          </div>
        </Container>
  );
}
