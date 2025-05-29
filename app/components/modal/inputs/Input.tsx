"use client";
import React from 'react'
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaDollarSign } from 'react-icons/fa';

interface InputProps{
  id: string,
  label: string, 
  type?: string, 
  disabled?: boolean, 
  formatPrice?: boolean,
  required?: boolean, 
  register: UseFormRegister<FieldValues>, 
  errors: FieldErrors     
}
export const Input: React.FC<InputProps> = ({
  id, label, type, disabled, formatPrice, required, register, errors 
}) => {
  return (
    <div className={`relative  ${formatPrice?"w-2/3 h-[3em] mx-auto pl-18 items-center ":"w-full "}`}>
        <input 
            id={id} disabled={disabled} placeholder='' type={type}
            {...register(id, {required})}
            className={`peer w-full border-2 rounded-md outline-none pl-2 py-2  transition disabled:opacity-70 disabled:cursor-not-allowed
                        ${formatPrice ?"text-end h-full pr-4 py":"pt-6"}
                        ${errors[id] ? " border-rose-500 focus:border-rose-500": "border-neutral-300  focus:border-neutral-700"}`}
        />
        <label
            htmlFor='id'
            className={`
            absolute duration-150 scale-75 transform origin-[0] top-4 -translate-y-3 z-10 left-2
            text-md peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
            ${formatPrice ? "h-full -translate-y-1 text-rose-400 font-semibold text-lg peer-focus:scale-100  peer-focus:-translate-y-2" : ""}
            ${errors[id] ?"text-rose-500" :"text-zinc-400"}
            `}
        >{label}</label>
    </div>
  )
}
