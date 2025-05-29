"use client"

import React from 'react'
import { SafeListing, SafeUser } from '../type'
import { Container } from '../components/Container'
import { Heading } from '../components/Heading'
import { ListingCard } from '../components/listing/ListingCard'

interface FavoProps{
    curUser?: SafeUser | null
    favorites: SafeListing[]
}
export const FavoriteClient: React.FC<FavoProps> = ({
    curUser, favorites
}) => {
  return (
    <Container>
        <div className='flex flex-col gap-4'>
            <div className='pt-32'>
                <Heading 
                title="Your collection"
                subTitle='Here are your favorite places to visit'
            />
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6 '>
                {favorites.map((favorite)=>{
                    return <ListingCard key={favorite.id} curUser={curUser} data={favorite}/>
                })}
            </div>
        </div>
    </Container>
  )
}
