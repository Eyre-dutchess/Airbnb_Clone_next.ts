"use client"

import React from 'react'

interface MenuItemProps{
    onClick: ()=> void
    label: string
}
export const MenuItem: React.FC<MenuItemProps> = ({onClick, label}) => {
  return (
    <div 
        className='py-2 px-4 hover:shadow-sm whitespace-nowrap'
        onClick={onClick}>
        {label}
    </div>
  )
}
