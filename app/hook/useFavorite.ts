
import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

import { SafeUser } from "../type"
import { useSignInModal } from "./useSignInModal"


interface IUseFavo{
    listingId: string
    curUser?: SafeUser | null
}
const useFavorite = ({
    listingId, curUser}:IUseFavo ) =>{
    
    const router = useRouter()
    const signinModal = useSignInModal()

    const hasFavored = useMemo(()=>{
        const list = curUser?.favoriteIds || [];
        return list.includes(listingId)
    }, [curUser, listingId])
    
     
    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation()

        if(!curUser){
            return signinModal.onOpen()
        }
        try {
            let request;
            if(hasFavored){
                request =()=> axios.delete(`/api/favorite/${listingId}` )
            }else{
                request = ()=> axios.post(`/api/favorite/${listingId}`)
            }
            await request()
            router.refresh()
            toast.success("This listing is added to your favorites")
        } catch (error) {
            toast.error("can't add it to your collection")
        }
    }, [
        curUser, hasFavored, listingId, signinModal, router
    ])

    return {hasFavored, toggleFavorite}
}

export default useFavorite;