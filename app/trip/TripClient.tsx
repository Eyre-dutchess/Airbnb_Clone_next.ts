"use client";

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '../type';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { ListingCard } from '../components/listing/ListingCard';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TripProps{
  reservations: SafeReservation[]
  curUser?: SafeUser | null
}
export const TripClient: React.FC<TripProps> = ({
  reservations, curUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback((id: string)=>{
      setDeletingId(id)

      axios.delete(`/api/reservation/${id}`)
      .then(()=>{
        toast.success("You've canceled this reservation!")
        router.refresh()
      })
      .catch(()=>{
        toast.error("can't cancel this reservation")
      })
      .finally(()=>{
        setDeletingId("")
      })
  }, [router])
  return (
    <Container>
      <div className='pt-32'>
        <Heading title="Trips" subTitle='where you have been and where you are going next'/>
      </div>
        <div className='w-full mt-10 gap-6 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4'>
          {reservations.map((reservation)=>{
            return <ListingCard key={reservation.id} 
                        data={reservation.listing} 
                        reservation={reservation}
                        actionId = {reservation.id} 
                        onAction={onCancel} 
                        disabled={deletingId === reservation.id}
                        actionLabel = "Cancel Reservation" 
                        curUser={curUser}
            />
          })}
        </div>
    </Container>
  )
}
