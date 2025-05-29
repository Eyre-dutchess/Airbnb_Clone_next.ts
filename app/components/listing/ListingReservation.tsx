"use client"

import React from 'react'
import { Range } from 'react-date-range'
import { Button } from '../modal/Button'
import Calender from './ListingCalender'

interface ReservationProps{
  price: number 
  totalPrice: number 
  disabled?: boolean
  dateRange: Range 
  onSubmit:()=> void
  onChangeDate:(value: Range)=>void 
  disabledDates: Date[]
}
export const ListingReservation: React.FC<ReservationProps> = ({
  price, totalPrice, disabledDates, disabled, onChangeDate, onSubmit , dateRange
}) => {
  return (
    <div className='w-full flex flex-col items-center bg-white rounded-xl border border-neutral-200 overflow-hidden'>
        <div className='flex flex-row items-center gap-2 p-4 border-b w-full'>
            <span className='text-lg font-medium'>$ {price}</span>
            <p className='font-light'> / night</p>
        </div>
        <hr />
        <Calender 
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value)=> onChangeDate(value.selection)}
        />
        <hr />
        <div className='w-full border-t p-4'>
            <Button 
                disabled={disabled}
                label='Reserve'
                onClick={onSubmit}
            />
        </div>
        <div className='w-full p-4 flex flex-row items-center justify-between font-semibold text-lg'>
            <p>Total: </p>
            <div>${totalPrice}</div>
        </div>
    </div>
  )
}
