"use client"

import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { SafeUser } from '../type'
import useFavorite from '../hook/useFavorite'

interface FavoBtnProps{
  listingId: string
  curUser?: SafeUser | null
}
export const FavoButton: React.FC<FavoBtnProps> = ({
  listingId, curUser
}) => {
    const {hasFavored, toggleFavorite} = useFavorite({listingId, curUser})
  
    return (
      <div onClick={toggleFavorite} className='cursor-pointer transition relative hover:scale-105'>
        <AiFillHeart 
          className={`absolute top-0 right-0  ${hasFavored ?"fill-rose-400":"fill-white/75"}`}
          size={26}
        />
        <AiOutlineHeart 
          className={'absolute top-0 right-0 fill-rose-400/50'}
          size={26}
        />
      </div>
    )
}
