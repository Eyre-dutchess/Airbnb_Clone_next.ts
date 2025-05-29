"use client";
import React, { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle, FaInstagram } from 'react-icons/fa';

import { useRegisterModal } from '@/app/hook/useRegisterModal';
import { useSignInModal } from '@/app/hook/useSignInModal';
import { Modal } from './Modal';
import { Input } from './inputs/Input';
import { Button } from './Button';
import { Heading } from '../Heading';


export const SignInModal = () => {
  const registerModal = useRegisterModal()
  const signModal = useSignInModal()

  const [isLoading, setIsLoading] = useState(false)
  
  const toggle = useCallback(()=>{
        registerModal.onOpen()
        signModal.onClose()
    }, [registerModal, signModal])

  const {handleSubmit, register, formState:{errors}} = 
    useForm<FieldValues>({
      defaultValues:{
        email:"",
        password:""
      }
    })

  const onSubmit:SubmitHandler<FieldValues> = (data) =>{
      setIsLoading(true)
      signIn("credentials",{
        ...data,
        redirect: false
      })
      .then((callback)=>{
        setIsLoading(false)
        if(callback?.ok){
          signModal.onClose()
          toast.success("you are signed in!")
          location.reload()
        }
        if(callback?.error){
          toast.error(callback.error)
        }
      })
  }

  const body = (
    <div className='w-full flex flex-col gap-4'>
      <div className='text-center  py-3'>
        <Heading title="Welcome back" subTitle='Login to your account!'/>
      </div>
     
      <div className='w-4/5 mx-auto flex flex-col gap-2'>
        <Input 
            id="email"
            label="Email: "
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input 
            id="password"
            label="Password: "
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type='password'
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
    </div>
  )
  const footer = (
    <div className=' text-sm w-full text-center text-zinc-200 py-4 border-t border-zinc-200'>
      Don't have an account yet? 
      <span className='cursor-pointer text-zinc-400 hover:text-zinc-600' onClick={toggle}> Register Now!</span>
    </div>
  )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={signModal.open}
        onClose={signModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={body}
        footer={footer}
        actionLabel="Submit"
    />
  )
}
