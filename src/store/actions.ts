import {LogInActionsType, AddDataActionsType} from "./types"
import {page} from "../componets/Home"

export const saveToken=(note:string):LogInActionsType=>({
    type: "SET_LOG_IN",
    payload : note
})

export const addData = (data:page[]):AddDataActionsType=>({
    type:"ADD_DATA",
    payload: data
})
