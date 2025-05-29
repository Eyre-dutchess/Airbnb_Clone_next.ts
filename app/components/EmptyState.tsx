"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

import { Heading } from './Heading'
import { Button } from './modal/Button'

interface EmptyProps{
    title?: string
    subTitle?: string
    showReset?: boolean 
}
export const EmptyState: React.FC<EmptyProps> = ({
    title="No matches found!",
    subTitle="Try to change or remove some of your filters",
    showReset
}) => {
    const router = useRouter()
    return (
        <div className='w-full max-w-[500px] mx-auto h-[60vh] flex flex-col items-center justify-center gap-4'>
            <Heading 
                title={title}
                subTitle={subTitle}
            />
            {showReset && (
                <Button 
                    outline
                    label='go back to main page'
                    onClick={()=> router.push("/")}
                />
            )}
        </div>
    )
}
