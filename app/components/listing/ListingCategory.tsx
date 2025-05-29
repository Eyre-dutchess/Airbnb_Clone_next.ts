"use client"

import React from 'react'
import { IconType } from 'react-icons'

interface CatoProps{
     label?: string | null,
     icon?: IconType | null,

}
export const ListingCategory: React.FC<CatoProps> = ({
  label, icon:Icon
}) => {
  return (
    <div className='flex flex-row pt-4 gap-4 items-center text-rose-800/75'>
      {Icon && <Icon size={40} />}
      <p>{label}</p>
    </div>
  )
}
