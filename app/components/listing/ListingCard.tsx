"use client"

import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { SafeListing, SafeReservation, SafeUser } from '@/app/type'
import { useCountries } from '@/app/hook/useCountries'
import { FavoButton } from '../FavoButton'
import { Button } from '../modal/Button'

interface SingleProps{
    data:SafeListing
    curUser?: SafeUser | null
    reservation?: SafeReservation
    actionId?: string
    actionLabel?: string
    onAction?: (id: string)=> void
    disabled?: boolean
}
export const ListingCard: React.FC<SingleProps> = ({
    data, curUser, actionId="", actionLabel, onAction, disabled, reservation}) => {
    const router = useRouter()
    const {getByValue} = useCountries()
    
    const location = useMemo(()=>{
        return getByValue(data.locationValue)
    }, [data])
    
    const price = useMemo(()=>{
        if(reservation){
            return reservation.totalPrice
        }
        return data.price
    }, [reservation, data.price])

    const reservedDates = useMemo(()=>{
        if(!reservation){
            return null
        }
        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)
        console.log(end, reservation.endDate)
        return `${format(start, "PP")} --- ${format(end, "PP")}`
    }, [reservation])
   
    const handleCancel = useCallback((
        e: React.MouseEvent<HTMLButtonElement>
    )=>{
        e.stopPropagation();
        if(disabled)return ;

        onAction?.(actionId)
    }, [onAction, actionId, disabled])
    return (
        <div onClick={()=>router.push(`/listing/${data.id}`) } className='col-span-1 relative z-10 cursor-pointer group rounded-lg p shadow'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='aspect-square w-full border-4 relative overflow-hidden rounded-xl'>
                    <Image 
                        alt="house pic"
                        src={data.imgSrc}
                        fill
                        style={{objectFit:"cover", width:"100%", height:"100%"}}
                        className='group-hover:scale-110 transition'
                    />
                    <div className='absolute top-3 right-3'>
                        <FavoButton 
                            listingId = {data.id}
                            curUser = {curUser}
                        />
                    </div>
                </div>

                <div className='font-semibold text-md pl-2 pt-3'>
                    {location?.label} , {location?.region}
                </div>

                <div className='px-2 pb-2 text-neutral-400 pb-3'>
                    {reservation? (
                        <div className="flex flex-col text-sm gap-2">
                            <p className='text-neutral-800/75'>{reservedDates}</p>
                            <p className='text-neutral-800 font-semibold '>Total: ${price}</p>
                        </div>
                    ):(
                        <div className="flex flex-row items-center justify-between">
                            {data.category} 
                            <p className='text-neutral-800 font-semibold '>${price} <span className='text-sm'>/ per night</span></p>
                        </div>
                    )}
                </div>
                {actionLabel && onAction && (
                    <div className='w-4/5 mx-auto mb-4 scale-75'>
                        <Button label={actionLabel} onClick={()=>handleCancel}/>
                    </div>
                )}
            </div>
        </div>
    )
}
