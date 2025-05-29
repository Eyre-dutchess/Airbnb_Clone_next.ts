"use client"

import React from 'react'
import Image from 'next/image'

import { useCountries } from '@/app/hook/useCountries'


interface HeadProps{
    locationValue: string,
    title: string,
    imgSrc: string
}
export const ListingHead : React.FC<HeadProps>= ({
    locationValue, title, imgSrc
}) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)
    return (
        <div className='flex flex-col gap-6 w-full pt-20'>
            <div className='w-full border-b p-2'>
                <h6 className='text-3xl font-semibold '>{title}</h6>
                <p className='text-neutral-500 text-lg'>{location?.label} , {location?.region}</p>
            </div>
            <div className='w-full  h-[60vh] md:h-[70vh] relative overflow-hidden'>
                <Image 
                    alt="listing img"
                    src={imgSrc}
                    fill
                    style={{objectFit:"cover", width:"100%", height:"100%"}}
                    className='p-2 rounded-2xl shadow-inner '
                />
            </div>
        </div>
    )
}
