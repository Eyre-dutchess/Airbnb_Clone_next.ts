"use client"

import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../type'
import { Container } from '../components/Container'
import { Heading } from '../components/Heading'
import { ListingCard } from '../components/listing/ListingCard'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface ProperProps{
  curUser?: SafeUser | null
  listings: SafeListing[]
}
export const PropertyClient: React.FC<ProperProps> = ({
  curUser, listings
}) => {
  const [deletingId, setDeletingId] = useState("")
  const router = useRouter()

  const onCancel = useCallback((id: string)=>{
    setDeletingId(id)
    axios.delete(`/api/listing/${id}`)
    .then(()=>{
      toast.success("Properties deleted!")
      router.refresh()
    })
    .catch(()=>{
      toast.error("can't delete this property")
    })
    .finally(()=>{
      setDeletingId("")
    })
  }, [])

  return (
    <Container>
        <div className='pt-32'>
          <Heading 
            title='Your properties'
            subTitle='Here are your properties information'
          />
        </div>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
            {listings.map((listing)=>{
              return <ListingCard 
                        key={listing.id}
                        curUser={curUser}
                        data={listing}
                        actionId={listing.id}
                        actionLabel='Delete property'
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
              />
            })}
        </div>
    </Container>
  )
}
