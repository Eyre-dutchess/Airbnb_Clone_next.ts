"use client";

import React, { useCallback } from 'react'
import {CldUploadWidget} from "next-cloudinary"
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

declare global{
   var cloudinary: any
}

interface ImgProps{
    value: string
    onChange: (value: string)=> void
}
export const ImgInput: React.FC<ImgProps> = ({
    value, onChange
}) => {
    const handleUpload = useCallback((result: any)=>{
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset='fnhetpjm'
            options={{
                maxFiles: 1
            }}
        >
            {({ open })=>{
                return (
                    <div onClick={()=> open?.()}
                         className='cursor-pointer relative transition  overflow-hidden opacity-75 text-semibold hover:opacity-100 w-4/5 mx-auto h-[35vh] p-20 rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-2 '
                    >
                        <TbPhotoPlus size={40} />
                        <h6 className='text-lg '>Add a Photo</h6>
                        
                        {value && (
                        <div className='absolute inset-0 w-full h-full opacity-100'>
                            <Image 
                                alt='Upload'
                                src={value}
                                fill
                                style={{objectFit:"cover", width:"100%", height:"100%"}}
                            />
                        </div>
                    )}
                    </div>   
                ) }}
        </CldUploadWidget>
    )
}
