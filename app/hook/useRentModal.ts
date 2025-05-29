import {create} from "zustand";

interface UseRentStore{
    open:boolean,
    onOpen: ()=> void,
    onClose: ()=> void
}

export const useRentModal = create<UseRentStore>((set)=>({
    open: false,
    onOpen: ()=> set({open: true}),
    onClose: ()=> set({open: false})
}))