"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';

import { Button } from './Button';

interface ModalProps{
    isOpen? : boolean,
    onClose: ()=> void,
    onSubmit: () => void,
    title? :string,
    body? : React.ReactElement,
    footer?: React.ReactElement,
    actionLabel: string,
    disabled?: boolean,
    secondaryAction?: ()=> void ,
    secondaryActionLabel?: string
}
export const Modal: React.FC<ModalProps> = ({
    isOpen, onClose, onSubmit, title, body, footer,actionLabel, disabled, secondaryAction, secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(()=>{
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(()=>{
        if(disabled){
            return ;
        }
        setShowModal(false)
        setTimeout(()=>{
            onClose()
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(()=>{
        if(disabled){
            return
        }
        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(()=>{
        if(disabled || !secondaryAction)return ;
        secondaryAction()
    }, [disabled, secondaryAction])

    if(!isOpen) return null;
    return (
        <div className='w-screen fixed overflow-x-hidden overflow-y-auto  bg-zinc-800/75 focus:outline-none outline-none z-50 inset-0 flex items-center justify-center'>
            <div className="relative w-4/5 md:w-2/3 lg:w-1/2 xl:w-3/5  md:h-auto lg:h-auto my-6 mx-auto ">
                {/* content */}
                <div className={`translate duration-300 w-full h-full ${showModal ?"translate-y-0 opacity-100" :"translate-y-full opacity-0"}`}>
                    <div className="translate w-full  h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div className="w-full border-b border-neutral-400 flex items-center justify-center pt-5 rounded-t border-b-px">
                            <h3 className='font-semibold text-2xl pt-6 pb-2'>{title}</h3>
                            <button
                                onClick={handleClose}
                                className='p-2 hover:shadow-lg rounded-full hover:bg-zinc-200 hover:opacity-70 transition absolute right-4'
                            ><FaTimes size={16}/></button>
                        </div>
                        {/* body */}
                        <div className="relative px-6 flex-auto">{body}</div>
                        {/* footer */}
                        <div className="w-4/5 mx-auto flex flex-col gap-2 py-6 px-4">
                            {footer}
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryAction && secondaryActionLabel && (
                                    <Button 
                                        outline
                                        disabled = {disabled}
                                        label={secondaryActionLabel}
                                        onClick={secondaryAction}
                                        />)}
                                
                                <Button 
                                    disabled = {disabled}
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                    />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
