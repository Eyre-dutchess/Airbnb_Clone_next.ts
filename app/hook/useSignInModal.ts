import {create} from "zustand";

interface UseSigninStore{
    open:boolean,
    onOpen: ()=> void,
    onClose: ()=> void
}

export const useSignInModal = create<UseSigninStore>((set)=>({
    open: false,
    onOpen: ()=> set({open: true}),
    onClose: ()=> set({open: false})
}))