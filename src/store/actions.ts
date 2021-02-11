import {LogInActionsType, AddDataActionsType, UserActionsType} from "./types"
//import {page} from "../componets/Home"

export const saveToken=(note:string):LogInActionsType=>({
    type: "SET_LOG_IN",
    payload : note
})
export const saveUserName=(UserName:string):UserActionsType=>({
    type: "SET_USER_NAME",
    payload : UserName
})

export const addData = (NewLogin:string):AddDataActionsType=>({
    type:"ADD_DATA",
    payload: NewLogin
})
