import React from 'react'

import { getCurrentUser } from '../action/getCurrentUser'
import { getReservations } from '../action/getReservations'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'
import { ReservationClient } from './ReservationClient'


export default async function ReservationPage() {
  const curUser = await getCurrentUser()

  if(!curUser){
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthorized!"
          subTitle='Pleaese login first!'
          />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({userId: curUser.id})
  if(reservations.length == 0){
    return (
      <ClientOnly>
        <EmptyState 
          title="No Reservations found!"
          subTitle='Check out some popular listings'
        />
      </ClientOnly>)}

  return (
    <ClientOnly>
        <ReservationClient reservations={reservations} curUser = {curUser}/>
    </ClientOnly>
  )
  
}
