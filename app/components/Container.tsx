"use client";
import React from 'react'

interface ContainerProps{
    children: React.ReactNode
}
export const Container:React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='max-w-[2520px] mx-auto px-[calc(5vw_+_0.25em)] sm:px-[calc(5vw_+_0.5em)] md:px-[calc(5vw_+_0.75em)] xl:px-[calc(5vw_+_1em)] '>
        {children}
    </div>
  )
}
