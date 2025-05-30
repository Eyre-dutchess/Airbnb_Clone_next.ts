"use client"

import React, { useCallback } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

interface InfoProps{
    title: string
    subTitle: string
    value: number
    onChange: (value: number)=> void
}
export const InfoInput: React.FC<InfoProps> = ({
    title, subTitle, value, onChange
}) => {
    const onReduce = useCallback(()=>{
        if(value===1){
            return 
        }
        onChange(value - 1)
    }, [value, onChange])

    const onAdd = useCallback(()=>{
        onChange(value + 1)
    }, [value, onChange])

    return (
        <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col '>
                <h6 className='font-medium'>{title}</h6>
                <h6 className='font-light text-grey-600'>{subTitle}</h6>
            </div>
            <div className='flex flex-row items-center gap-4'>
                <div onClick={onReduce}
                    className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center 
                            text-neutral-600 cursor-pointer hover:opacity-80 transition'   
                >
                    <FaMinus />
                </div>
                <h6>{value}</h6>
                <div onClick={onAdd}
                    className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center 
                            text-neutral-600 cursor-pointer hover:opacity-80 transition'   
                >
                    <FaPlus />
                </div>
            </div>
        </div>
    )
}
