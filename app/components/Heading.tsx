"use client";
import React from 'react'

interface HeadProps{
    title?: string, 
    subTitle?: string
}
export const Heading : React.FC<HeadProps>= ({
    title, subTitle
}) => {
  return (
    <div className='flex flex-col  w-full  capitalize '>
      <h1 className='text-3xl w-full  pb-3 font-semibold '>{title}</h1>
      {title && <p className='w-full h-[1px] bg-zinc-800/50'></p>}
      <h3 className='text-sm pt-3  font-semibold'>{subTitle}</h3>
    </div>
  )
}
