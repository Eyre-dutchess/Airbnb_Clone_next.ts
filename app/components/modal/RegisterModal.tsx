"use client";
import React, { useCallback, useState } from 'react'

import { FaGoogle, FaInstagram } from 'react-icons/fa';
import {  FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Modal } from './Modal';
import { useRegisterModal } from '@/app/hook/useRegisterModal';
import { useSignInModal } from '@/app/hook/useSignInModal';
import { Heading } from '../Heading';
import { Input } from './inputs/Input';
import { Button } from './Button';


interface RegisterProps{
  emails?: string[]
}
export const RegisterModal: React.FC<RegisterProps> = (emails) => {
  const registerModal = useRegisterModal()
  const signModal = useSignInModal()

  const [isLoading, setIsLoading] = useState(false)
  const {handleSubmit, register, formState:{errors}} = 
    useForm<FieldValues>({
      defaultValues:{
        name:"",
        email:"",
        password:"",
        imgSrc: "/images/smiledog.jpg"
      }
    })

  const onSubmit:SubmitHandler<FieldValues> = (data) =>{
      setIsLoading(true)
      
      axios.post("/api/register", data)
      .then(()=>{
        
        registerModal.onClose()
        toast.success("You did it!")
      })
      .catch(()=>{
        if(emails?.emails?.includes(data.email)){
        toast.error("email address already exist! try log in!")
        }else{
          toast.error("something went wrong!")
        }
      })
      .finally(()=>{
        setIsLoading(false)
      })
      
  }

const toggle = useCallback(()=>{
    registerModal.onClose()
    signModal.onOpen()
}, [registerModal, signModal])

  const body = (
    <div className='flex flex-col gap-4'>
      <div className='w-full text-center py-3'>
        <Heading title="Welcome to Airbnb" subTitle='Create an account!'/>
      </div>
      
      <Input 
          id="name"
          label="Name: "
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="text"
      />
      <Input 
          id="email"
          label="Email: "
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="text"
      />
      <Input 
          id="password"
          label="Password: "
          disabled={!isLoading}
          register={register}
          errors={errors}
          required
          type="password"
      />
      <div className='w-full relative'>
          <div className='absolute w-full h-[1px] bg-zinc-400 left-0 top-2'></div>
          <p className='text-xs text-zinc-400/80 text-center'>or</p>
        </div>

        <Button 
          label="Google"
          icon={FaGoogle}
          onClick={()=>{}}
          outline
        />
        <Button 
            label="Instagram"
            icon={FaInstagram}
            onClick={()=>{}}
            outline
        />
    </div>
  )
  const footer = (
    <div className='text-sm w-full text-center text-zinc-400 py-4 border-t border-zinc-200'>
      Have an account already? 
      <span className='cursor-pointer text-zinc-400 hover:text-zinc-600' onClick={toggle}> Sign in now!</span>
    </div>
  )
  return (
    <Modal 
        disabled = {isLoading}
        isOpen={registerModal.open}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={body}
        footer={footer}
        actionLabel="Submit"
    />
  )
}
