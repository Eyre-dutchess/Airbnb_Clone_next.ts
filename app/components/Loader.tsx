"use client"

import React from 'react'
import {PuffLoader} from "react-spinners";

export const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col items-center justify-center'>
        <PuffLoader 
            size={100}
            color='red'
            />
    </div>
  )
}
