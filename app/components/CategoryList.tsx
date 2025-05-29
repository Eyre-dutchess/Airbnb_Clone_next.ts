"use client"

import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { BsSnow } from 'react-icons/bs'
import { GiBarn, GiCactus, GiCampfire, GiPenguin } from 'react-icons/gi'
import {  MdOutlineFestival, MdOutlineHolidayVillage, MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbBuildingSkyscraper,  TbPool } from 'react-icons/tb'
import { BiSolidCastle } from 'react-icons/bi'

import { Container } from './Container'
import { CategorySingle } from './CategorySingle'



export const categories = [
    {
        label:"Beach",
        icon:TbBeach, 
        description:"This property brings you to the aquaria fairytales"
    },
    {
        label:"Castle",
        icon: BiSolidCastle,
        description:"This property is the gem among world luxury"
    },
    {
        label:"Camping",
        icon:  GiCampfire,
        description:"This property is about elvin mysteries among the mountains"
    },
    {
        label:"Skiing",
        icon: BsSnow,
        description:"This property sits at the heart of the winter wonderland"
    },
    {
        label:"Shopping",
        icon: TbBuildingSkyscraper,
        description:"This property bring the glammer of the cosmopolitan"
    },
    {
        label:"Desert",
        icon: GiCactus,
        description:"This property brings you to the desert"
    },
    {
        label:"Arctic",
        icon: GiPenguin
    },
    {
        label:"CountrySide",
        icon: GiBarn,
        description:"This property fitures around generation-old barn life"
    },
      {
        label:"Festival",
        icon: MdOutlineFestival
      },
      {
        label:"Pool",
        icon: TbPool
      },
      {
        label:"Holiday",
        icon: MdOutlineHolidayVillage
      },
     
    
]
export const CategoryList = () => {
    const params = useSearchParams()
    const category = params?.get("category")
    const pathName = usePathname()

    const isMainPage = pathName==="/"
    if(!isMainPage)return null;
  
    return (
        <Container>
            <div className='h-[25vh] flex flex-row items-end gap-10 justify-between overflow-x-auto '>
                {categories.map((cato)=>{
                    return <CategorySingle key={cato.label} 
                    label={cato.label} icon={cato.icon} selected={cato.label === category}/>
                })}
            </div>
        </Container>
    )
}
