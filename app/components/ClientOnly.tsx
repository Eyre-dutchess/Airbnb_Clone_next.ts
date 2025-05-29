"use client";

import { useEffect, useState } from "react";

interface ClientProps{
    children: React.ReactNode
}


export const ClientOnly: React.FC<ClientProps> = ({children}) => {
  
    const [mounted, setMounted] = useState(false)
    useEffect(()=>{
        setMounted(true)
    }, [])
    if(!mounted){
        return null
    }
  return (
    <div>
      {/* <p className="text-5xl text-rose-500 font-bold text-center w-full ">Hello Airbnb</p> */}
      {children}
    </div>
  )
}
