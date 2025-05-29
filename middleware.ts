export {default} from "next-auth/middleware"

export const config = {
    matcher:[
        "/trip",
        "/favorite",
        "/property",
        "/reservation"
    ]
}