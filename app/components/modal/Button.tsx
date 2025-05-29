"use client";

import React from 'react'
import { IconType } from 'react-icons';

interface BtnProps{
    id?: string,
    label?: string,
    icon?: IconType,
    onClick: ()=>void,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean
}
export const Button: React.FC<BtnProps> = ({
    id,  label, icon: Icon, onClick, disabled, outline, small
}) => {
  return (
    <button
        id={id}
        onClick={onClick}
        disabled={disabled}
        className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ?"w-2/3 bg-white border-black text-black hover:bg-rose-500/75 hover:border-none hover:text-white" :"bg-rose-500 border-rose-500 text-white"}
            ${small ? "py-1 text-sm font-light border-[1px]" : "py-3 text-md font-semibold border-2"}
            `}
         >
        {Icon && (
            <Icon 
                size={16}
                className='absolute left-4 top-3'
            />
        )}
        {label}
    </button>
  )
}
