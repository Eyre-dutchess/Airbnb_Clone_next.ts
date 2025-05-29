import {create} from "zustand";

interface UseRegisterStore{
    open:boolean,
    onOpen: ()=> void,
    onClose: ()=> void
}

export const useRegisterModal = create<UseRegisterStore>((set)=>({
    open: false,
    onOpen: ()=> set({open: true}),
    onClose: ()=> set({open: false})
}))