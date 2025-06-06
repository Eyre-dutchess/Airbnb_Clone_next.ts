import React from 'react'

import { getCurrentUser } from '../action/getCurrentUser'
import { getReservations } from '../action/getReservations'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'
import { ReservationClient } from './ReservationClient'
import prisma from "@/app/libs/prismadb"

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

  const reservations = await prisma.reservation.findMany({
            where:{
              userId: curUser.id
            },
            include:{
                listing: true
            },
            orderBy:{
                createdAt: "desc"
            }
        })
  const safeReservations = reservations.map((item:any)=>({
                ...item, 
                createdAt: item.createdAt.toISOString(),
                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),
                listing:{
                    ...item.listing,
                    createdAt: item.listing.createdAt.toISOString()
                }
            
        }))
  if(safeReservations.length == 0){
    return (
      <ClientOnly>
        <EmptyState 
          title="No Reservations found!"
          subTitle='Check out some popular listings'
        />
      </ClientOnly>)}

  return (
    <ClientOnly>
        <ReservationClient reservations={safeReservations} curUser = {curUser}/>
    </ClientOnly>
  )
  
}
