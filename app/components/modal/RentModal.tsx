"use client"

import React, { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { useRentModal } from '@/app/hook/useRentModal'
import { Modal } from './Modal'
import { Input } from './inputs/Input'
import { Heading } from '../Heading'
import { categories } from '../CategoryList'
import { CategoryInput } from './inputs/CategoryInput'
import { CountryInput } from './inputs/CountryInput'
import { InfoInput } from './inputs/InfoInput'
import  MapInput  from './inputs/MapInput'
import { ImgInput } from './inputs/ImgInput'


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5 
}
export const RentModal = () => {
    const rentModal = useRentModal()
    const router = useRouter()

    const [loading, setLoading]= useState(false)
    const [step, setStep] = useState(STEPS.CATEGORY)

    const onBack = () =>{
        setStep(value=> value -1)
    }
    const onNext = () =>{
        setStep(value=> value +1)
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return "Create"
        }
        return "Next"
    }, [step])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined
        }
        return "Back"
    }, [step])

    const {register, handleSubmit, setValue, watch, formState:{errors}}
        = useForm<FieldValues>({
            defaultValues:{
                category:"",
                location:null,
                guestCount: 1,
                roomCount: 1,
                bathCount: 1,
                imgSrc: "",
                price: 1,
                title:"",
                description: ""
            }
        })

    const category = watch("category")
    const location = watch("location")
    const MapInput = useMemo(()=> dynamic(()=> import("./inputs/MapInput"), 
       {ssr:false}
    ), [location])

    const guestCount = watch("guestCount")
    const roomCount = watch("roomCount")
    const bathCount = watch("bathCount")
    const imgSrc = watch("imgSrc")
    const price = watch("price")
    const title = watch("title")
    const description = watch("description")

    const setCustomValue = (id: string, value:any ) =>{
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> =(data) =>{
        
        if(step !== STEPS.PRICE){
            return onNext()
        }
        setLoading(true)
        axios.post("/api/listing", data)
        .then(()=>{
            rentModal.onClose()
            toast.success("This listing added succesfully")
            router.push("/")
        })
        .catch(()=>{
            toast.error("can't add this property")
        })
        .finally(()=>{
            setLoading(false)
            
        })
       
    }

    let body=(
        <div className='flex flex-col gap-4 py-4'>
            <div className='w-full text-center scale-105'>
                <Heading subTitle="Which of these best describe your place"
                    />
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item)=>{
                    return (
                        <div className='col-span-1' key={item.label}>
                            <CategoryInput 
                                onClick={(category)=> setCustomValue("category", category)}
                                selected = {item.label === category}
                                icon={item.icon}
                                label={item.label}
                            />
                        </div>)
                })}
            </div>
        </div>
    )
    
    if(step === STEPS.LOCATION){
        body=(
            <div className='flex flex-col gap-4 py-4'>
                <div className='w-full text-center scale-105 '>
                    <Heading subTitle="Where is your place located?"/>
                </div>
                <CountryInput 
                    value = {location}
                    onChange={(value)=>setCustomValue("location", value)}
                />
                <MapInput 
                    center={location?.latlng}
                />
            </div>
        )
    }
    if(step === STEPS.INFO){
        body=(
            <div className='flex flex-col gap-4 py-4'>
                <div className='w-full text-center scale-105 '>
                    <Heading subTitle="More information about this place"/>
                </div>
                <InfoInput 
                    title="Guests"
                    subTitle='How many guests can you host?'
                    value={guestCount}
                    onChange = {(value)=> setCustomValue("guestCount", value)}
                />
                <hr/>
                <InfoInput 
                    title="Rooms"
                    subTitle='How many rooms in your house?'
                    value={roomCount}
                    onChange = {(value)=> setCustomValue("roomCount", value)}
                />
                <hr/>
                <InfoInput 
                    title="Bathrooms"
                    subTitle='How many bathrooms in your house?'
                    value={bathCount}
                    onChange = {(value)=> setCustomValue("bathCount", value)}
                />
            </div>
        )
    }
    if(step === STEPS.IMAGES){
        body=(
            <div className='flex flex-col gap-4 py-4'>
                <div className='w-full text-center scale-105 '>
                    <Heading subTitle="Provide some pictures of your place"/>
                </div>
                <ImgInput 
                    value = {imgSrc}
                    onChange={(value)=>setCustomValue("imgSrc", value)}
                />
            </div>
        )
    }
    if(step === STEPS.DESCRIPTION){
        body=(
            <div className='flex flex-col gap-4 py-4'>
                <div className='w-full text-center scale-105 '>
                    <Heading subTitle="Tell guests about this place"/>
                </div>
                <Input 
                    id="title"
                    label="Title: "
                    disabled={!loading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id="description"
                    label="Details: "
                    disabled={!loading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if(step === STEPS.PRICE){
        body=(
            <div className='flex flex-col gap-4 py-4'>
                <div className='w-full text-center scale-110 '>
                    <Heading subTitle="Last step: how much per night?"/>
                </div>
                <Input 
                    id="price"
                    label="Price: $"
                    type="number"
                    formatPrice
                    disabled={!loading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal 
            isOpen={rentModal.open}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Airbnb Your Home"
            body={body}
            actionLabel={actionLabel}
            disabled={!loading}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
        />
    )
}
