"use client";

import React, { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string"

import { useSearchModal } from '@/app/hook/useSearchModal';
import { Modal } from './Modal';
import { CountryInput, CountrySelectValues } from './inputs/CountryInput';
import { InfoInput } from './inputs/InfoInput';
import { formatISO } from 'date-fns';
import { Heading } from '../Heading';
import Calender from '../listing/ListingCalender';


enum STEPS{
    LOCATION = 0,
    INFO = 1,
    DATES = 2
}

export const SearchModal = () => {
    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal()

    const [step, setStep] = useState(STEPS.LOCATION)
    const [location, setLocation] = useState<CountrySelectValues>()
    const [roomCount, setRoomCount] = useState(1)
    const [bathCount, setBathCount] = useState(1)
    const [guestCount, setGuestCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key:"selection"
    })

    const Map = useMemo(()=> dynamic(()=> import("@/app/components/modal/inputs/MapInput"), {
        ssr: false
    }), [location])

    const onBack = ()=>{
        setStep(value=> value - 1)
    }
    const onNext = ()=>{
        setStep(value=> value + 1)
    }

    const actionLabel = useMemo(()=>{
        if(step !== STEPS.DATES){
            return "Next"
        }
        return "Search"
    }, [step])
    const secondaryActionLabel = useMemo(()=>{
        if(step !== STEPS.LOCATION){
            return "Back"
        }
        return undefined
    }, [step])
   
   
    const onSubmit = useCallback(()=>{
        if(step !== STEPS.DATES){
           return onNext()
        }

        let currentQuery ={}
        if(params){
            currentQuery = qs.parse(params.toString())
        }

        const updateQuery: any={
            ...currentQuery, 
            locationValue: location?.value,
            guestCount, 
            roomCount,
            bathCount,
        }

        if(dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate)
        }
        if(dateRange.endDate){
            updateQuery.endDate = formatISO(dateRange.endDate)
        }
        const url = qs.stringifyUrl({
            url:"/",
            query: updateQuery
        }, {skipNull: true})
        setStep(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)
    }, [step, searchModal, location, router, guestCount, roomCount, bathCount, dateRange, onNext, params])

    let body = (
        <div className=' w-4/5 mx-auto py-6 flex flex-col gap-4'>
            <Heading subTitle="Where do you want to go?"/>
            <CountryInput value={location} onChange={(value)=> setLocation(value as CountrySelectValues)}/>
            <hr />
            <Map center={location?.latlng}/>
        </div>
    )
    if(step === STEPS.INFO){
        body=(
        <div className=' w-4/5 mx-auto py-6 flex flex-col gap-4'>
            <div className='border-b-2 -translate-y-3'>
                <Heading subTitle="Information about the place" />
            </div>
            
            <InfoInput 
                 title="Guests"
                 subTitle='How many guests can you host?'
                 value={guestCount}
                 onChange = {(value)=> setGuestCount(value)}
                />
            <hr/>
            <InfoInput 
                 title="Rooms"
                 subTitle='How many rooms in your house?'
                 value={roomCount}
                 onChange = {(value)=> setRoomCount( value)}
                />
            <hr/>
            <InfoInput 
                 title="Bathrooms"
                 subTitle='How many bathrooms in your house?'
                 value={bathCount}
                 onChange = {(value)=> setBathCount(value)}
                />
        </div>
        )
        
    }
    if(step === STEPS.DATES){
        body=(
            <div className=' w-4/5 mx-auto py-6 flex flex-col gap-4'>
                <div className='border-b-2 text-center'>
                    <Heading subTitle="When do you plan to travel?" />
                </div>
                <div className='rounded-lg shadow flex items-center justify-center'>
                    <Calender value={dateRange} onChange={(value)=> setDateRange(value.selection)}/>
                </div>
            </div>
        )
    }
    return (
        <Modal 
            isOpen={searchModal.open}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Find your ideal trip"
            body={body}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        />
    )
}
