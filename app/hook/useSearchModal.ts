import {create} from "zustand";

interface UseSearchStore{
    open:boolean,
    onOpen: ()=> void,
    onClose: ()=> void
}

export const useSearchModal = create<UseSearchStore>((set)=>({
    open: false,
    onOpen: ()=> set({open: true}),
    onClose: ()=> set({open: false})
}))