import React from 'react'
import { getCurrentUser } from '@/app/action/getCurrentUser'
import { getListingById } from '@/app/action/getListingById'
import { getReservations } from '@/app/action/getReservations'

import { ClientOnly } from '@/app/components/ClientOnly'
import { EmptyState } from '@/app/components/EmptyState'
import { ListingClient } from '@/app/listing/[listingId]/ListingClient'
import { SafeReservation, SafeUser } from '@/app/type'


interface IParams{
  listingId?: string
}
export default async function ListingPage(
  {params}:{params:IParams}
) {
  const curUser = await getCurrentUser() as SafeUser
  const listing = await getListingById(params) 
  const reservations = await getReservations(params)  as SafeReservation[]

  if(!listing){
    return (
      <ClientOnly>
          <EmptyState title="Can't find listing" showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
        <ListingClient 
          curUser={curUser}
          listing={listing}
          reservations={reservations}
        />
    </ClientOnly>
  )
}
