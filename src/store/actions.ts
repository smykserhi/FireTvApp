import {LogInActionsType, AddDataActionsType, UserActionsType} from "./types"
import {videoDisListType} from "../componets/Home"

//Login redicer
export const saveToken=(note:string):LogInActionsType=>({
    type: "SET_LOG_IN",
    payload : note
})
export const saveUserName=(UserName:string):UserActionsType=>({
    type: "SET_USER_NAME",
    payload : UserName
})

export const logOut = ()=>({
    type: "LOG_OUT"
})

// Data reducer
export const addVideo = (videoDetails:videoDisListType):AddDataActionsType=>({
    type:"ADD_VIDEO",
    payload: videoDetails
})

export const clearData = ()=>({
    type: "CLEAR"
})