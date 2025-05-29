import React from 'react'
import { getCurrentUser } from '../action/getCurrentUser'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'
import { getFavorites } from '../action/getFavorites'
import { FavoriteClient } from './FavoriteClient'

export default async function FavoritePage() {
  const curUser = await getCurrentUser()
  const favorites = await getFavorites()

  if(!curUser){
    return (
      <ClientOnly>
        <EmptyState 
          title='Unauthorized'
          subTitle='Login first'
        />
      </ClientOnly>
    )
  }
  if(!favorites || favorites.length < 1){
    return (
      <ClientOnly>
        <EmptyState 
          title="You haven't liked any places yet"
          subTitle='Start viewing some listings'
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
       <FavoriteClient curUser={curUser} favorites={favorites}/>
    </ClientOnly>
  )
}
