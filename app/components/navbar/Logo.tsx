"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

export const Logo = () => {
  const router = useRouter()
  return (
      <Image 
          onClick={()=> router.push("/")}
          alt="logo"
          width = "50"
          height="50"
          src="/images/logo1.png"
          className='hidden md:block hover:shadow-sm cursor-pointer'
      />
  )
}
