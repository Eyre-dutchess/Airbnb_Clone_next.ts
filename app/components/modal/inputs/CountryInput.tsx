"use client";

import React from 'react'
import Select from 'react-select';

import { useCountries } from '@/app/hook/useCountries';

export type CountrySelectValues = {
    flag: string,
    label: string,
    latlng: number[],
    region: string,
    value: string
}
interface CountryProps{
    value?: CountrySelectValues,
    onChange: (value: CountrySelectValues) => void
}
export const CountryInput: React.FC<CountryProps> = ({
    value, onChange
}) => {

    const {getAll} = useCountries()
    return (
        <div className='z-40'>
            <Select 
                value = {value}
                isClearable
                placeholder="Anywhere"
                onChange={(value)=> onChange(value as CountrySelectValues)}
                options={getAll()}
                classNames={{
                    control:()=> "p-2 border-2",
                    input:()=> "text-md",
                    option: ()=> "text-md"
                }}
                formatOptionLabel={(option: any)=>(
                    <div className='flex flex-row items-center gap-3'>
                        <div>{option.flag}</div>
                        <div>
                            {option.label},
                            <span className='text-neutral-500 ml-1'>{option.region}</span>
                        </div>
                    </div>
                )}
                theme={(theme)=>({
                    ...theme,
                    borderRadius:6,
                    colors:{
                        ...theme.colors,
                        primary: "pink",
                        primary25: "#ffe4e6"
                    }
                })}
            />
        </div>
    )
}
