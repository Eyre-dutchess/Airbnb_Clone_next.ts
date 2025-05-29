"use client";

import React from 'react'

import { SafeUser } from '@/app/type';
import { Logo } from './Logo';
import { Search } from './Search';
import { Usermenu } from './Usermenu';
import { Container } from '../Container';

interface NavProps{
  curUser?: SafeUser | null
}
export const Navbar: React.FC<NavProps> = ({curUser}) => {
  return (
    <div className='fixed top-0 z-40 left-0  w-full bg-white shadow-md'>
      <Container>
        <div className=' py-4 flex flex-row items-center justify-between gap-3 md:gap-0'>
          <Logo />
          <Search />
          <Usermenu curUser={curUser}/>
        </div>
      </Container>
    </div>
  )
}
