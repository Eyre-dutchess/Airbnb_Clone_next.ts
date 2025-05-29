"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'

import { SafeUser } from '@/app/type'
import { ListingCategory } from './ListingCategory'
import { useCountries } from '@/app/hook/useCountries'
import { Avatar } from '../Avatar'

interface InfoProps{
    user: SafeUser
    guestCount: number
    roomCount: number
    bathCount: number
    description: string
    locationValue: string
    category: {
           label: string,
           icon: IconType,
       } | undefined
}
export const ListingInfo: React.FC<InfoProps> = ({
    user, guestCount, roomCount, bathCount, description, locationValue, category
}) => {
  const {getByValue} = useCountries()
  const location = getByValue(locationValue)?.latlng
  const Map = dynamic(()=> import("../modal/inputs/MapInput"), {
    ssr:false
  })
  return (
    <div className='col-span-4 flex flex-col  gap-3 px-4'>
        <div className='flex flex-col gap-3'>
            <div className='whitespace-nowrap w-full flex flex-row gap-10 items-center text-lg font-medium'>
                <h3>Hosted by {user.name}</h3>
                <Avatar src={user.image} />
            </div>
            <hr />
            <div className='flex flex-row items-center gap-6 text-neutral-500'>
              <p>{guestCount}{guestCount>1 ? " guests, ": " guest , "}</p>
              <p>{roomCount}{roomCount>1 ? " rooms, ": " room , "}</p>
              <p>{bathCount}{bathCount>1 ? " bathrooms, ": " bathroom , "}</p>
            </div>
        </div>
        <hr />
        <ListingCategory label={category?.label} icon={category?.icon} />
        <hr />
        <div>
          <h6 className='font-medium text-lg'>Descriptions: </h6>
          <p className='font-light text-sm'>{description}</p>
        </div>
        <hr />
        <div>
            <Map center = {location} />
        </div>
    </div>
  )
}
