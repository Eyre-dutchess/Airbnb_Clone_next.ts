"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { differenceInCalendarDays, eachDayOfInterval, setDate } from 'date-fns'
import { Range } from 'react-date-range'
import { useRouter } from 'next/navigation'

import { SafeListing, SafeReservation, SafeUser } from '@/app/type'
import { useSignInModal } from '@/app/hook/useSignInModal'
import { Container } from '../../components/Container'
import { ListingHead } from '../../components/listing/ListingHead'
import { ListingInfo } from '../../components/listing/ListingInfo'
import { ListingReservation } from '../../components/listing/ListingReservation'
import { categories } from '@/app/components/CategoryList'


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key:"selection"
}
interface ListProps{
    curUser?: SafeUser | null
    listing: SafeListing & {
        user: SafeUser
    }
    reservations?: SafeReservation[] 
}
export const ListingClient: React.FC<ListProps> = ({
    curUser, listing, reservations=[]
}) => {
    const loginModal = useSignInModal()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const disabledDates = useMemo(()=>{
        let dates: Date[] =[];

        reservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
            dates=[...dates, ...range]
        });
        return dates
    }, [reservations])

    const onCreateReservations = useCallback(()=>{
        if(!curUser){
          return  loginModal.onOpen()
        }
        setLoading(true)

        axios.post('/api/reservation', {
            totalPrice, 
            startDate:dateRange.startDate, 
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(()=>{
            setDateRange(initialDateRange)
            toast.success("You've reserved on this place! check it out")
            router.push("/trip")
        })
        .catch(()=>{
            toast.error("something went wrong")
        })
        .finally(()=>{
            setLoading(false)
        })
    }, [
        totalPrice, dateRange, listing?.id, router, curUser, loginModal
    ])

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate, dateRange.startDate
            )

            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }else{
                setTotalPrice(listing.price)
            }}
    }, [dateRange, listing.price])
   

    const category = useMemo(()=>{
        return categories.find((item)=>(
            item.label == listing.category
        ))
    }, [listing.category])
    return (
        <Container>
            <div className='max-w-screen-lg mx-auto shadow-md'>
                <div className="w-full flex flex-col items-center gap-2 p-4 ">
                    <ListingHead locationValue={listing.locationValue}
                        title={listing.title} imgSrc={listing.imgSrc}/>
                    <hr />
                    <div className='w-full grid grid-cols-1 lg:grid-cols-7 lg:gap-4 gap-2'>
                        <ListingInfo 
                            user = {listing.user}
                            category={category}
                            description={listing.description}
                            roomCount = {listing.roomCount}
                            bathCount = {listing.bathCount}
                            guestCount = {listing.guestCount}
                            locationValue = {listing.locationValue}
                        />
                        <div className='w-full mx-auto order-first md:order-last md:col-span-3'>
                            <ListingReservation price={listing.price} totalPrice={totalPrice} disabled={loading} dateRange={dateRange}  
                            onSubmit={onCreateReservations} onChangeDate={(value)=>setDateRange(value)} disabledDates={disabledDates} />
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </Container>
    )
}
