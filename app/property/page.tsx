import React from 'react'

import { getCurrentUser } from '../action/getCurrentUser'
import { getListings } from '../action/getListings'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'
import { PropertyClient } from './PropertyClient'

export default async function PropertyPage() {
  const curUser = await getCurrentUser()
  if(!curUser){
    return (
      <ClientOnly>
        <EmptyState 
            title='Unauthorized!'
            subTitle='Login first'
        />
      </ClientOnly>
    )
  }

  const listings = await getListings({
    userId: curUser.id
  })
  if(listings.length === 0){
    return (
      <ClientOnly>
        <EmptyState 
            title="No property found"
            subTitle="You don't have any properties listed"
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <PropertyClient curUser = {curUser} listings = {listings}/>
    </ClientOnly>
  )
}
