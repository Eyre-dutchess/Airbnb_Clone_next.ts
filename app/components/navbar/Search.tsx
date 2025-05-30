"use client";
import React from 'react'
import { FaSearch } from 'react-icons/fa';

import { useSearchModal } from '@/app/hook/useSearchModal';

export const Search = () => {
  const searchModal = useSearchModal()
  return (
    <div
    onClick={searchModal.onOpen}
    className='w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer border-[1px]'>
        <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
              Anywhere
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
              Any Week
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
              <div className="hidden sm:block">Any Guest</div>
              <div className="p-2 bg-rose-500 rounded-full text-white"><FaSearch size={12}/></div>
            </div>
        </div>
    </div>
  )
}
