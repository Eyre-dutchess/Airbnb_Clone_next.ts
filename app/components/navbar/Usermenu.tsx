"use client";

import React, { useCallback,  useEffect,  useState } from 'react'
import { FaBars} from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useSignInModal } from '@/app/hook/useSignInModal';
import { useRegisterModal } from '@/app/hook/useRegisterModal';
import { SafeUser } from '@/app/type';
import { useRentModal } from '@/app/hook/useRentModal';
import { Avatar } from '../Avatar';
import { MenuItem } from './MenuItem';




interface UserMenuProps{
  curUser? : SafeUser |null
}
export const Usermenu: React.FC<UserMenuProps> = ({curUser}) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const signModal = useSignInModal()
  const registerModal = useRegisterModal()
  const rentModal = useRentModal()

  useEffect(()=>{
    setIsOpen(false)
  },[router])
  const toggleOpen = useCallback(()=>{
    setIsOpen((value)=> !value)
  }, [])

  return (
    <div className='relative '>
        <div onClick={toggleOpen}
              className='flex flex-row items-center justify-center gap-3 rounded-full border border-zinc-400/45 hover:shadow-md cursor-pointer p-2 md:px-4 md:py-1'>
            <FaBars />
            <div className="hidden md:block">
              <Avatar src={`${curUser?"/images/smiledog.jpg":"/images/avatar.png"}`}/>
            </div>
        </div>
        
        <div className={`${isOpen ?"scale-y-100":"scale-y-0"} transform origin-top transition  absolute right-0 top-12 text-sm rounded-xl shadow-md w-[25vw] bg-white overflow-hidden`}>
            {curUser?(
              <div className='w-full flex flex-col cursor-pointer'>
                <MenuItem 
                    onClick={rentModal.onOpen}
                    label="Airbnb your home"
                  />
                <MenuItem 
                    onClick={()=> router.push("/favorite")}
                    label="My Favorites"
                  />
                <MenuItem 
                    onClick={()=> router.push("/trip")}
                    label="My Trips"
                  />
                <MenuItem 
                    onClick={()=> router.push("/property")}
                    label="My Properties"
                  />
                <MenuItem 
                    onClick={()=> router.push("/reservation")}
                    label="My Reservations"
                  />
                <MenuItem 
                    onClick={()=>signOut()}
                    label="Sign Out"
                  />
              </div>
            ):(
                <div className='w-full flex flex-col cursor-pointer'>
                  <MenuItem 
                    onClick={signModal.onOpen}
                    label="Sign In"
                  />
                  <MenuItem 
                    onClick={registerModal.onOpen}
                    label="Register"
                  />
                </div>
            )}
            
        </div>
    </div>
  )
}
