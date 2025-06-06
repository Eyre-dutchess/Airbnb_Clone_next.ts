import React from 'react'

import { getCurrentUser } from '../action/getCurrentUser'
import { getReservations } from '../action/getReservations'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'
import { TripClient } from './TripClient'
import prisma from "@/app/libs/prismadb"

export default async function TripPage() {
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

  const reservations = await prisma.reservation.findMany({
            where:{
              userId: curUser.id
            },
            orderBy:{
                createdAt: "desc"
            }
        })
  if(reservations.length == 0){
    return (
      <ClientOnly>
        <EmptyState 
          title="No trips found!"
          subTitle='Check out some popular listings'
        />
      </ClientOnly>)}

  return (
    <ClientOnly>
        <TripClient reservations={reservations} curUser = {curUser}/>
    </ClientOnly>
  )
  
}
