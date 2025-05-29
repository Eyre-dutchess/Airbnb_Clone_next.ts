"use client";
import Image from 'next/image';
import React from 'react'

interface AvatarProps{
  src?: string | null
}
export const Avatar : React.FC<AvatarProps>= ({src}) => {
  
  return (
    <Image 
      alt='avatar'
      src={src? src:"/images/friends.jpg"}
      width="100"
      height="100"
      className='object-cover rounded-full w-[2em] h-[2em]'
    />
  )
}
