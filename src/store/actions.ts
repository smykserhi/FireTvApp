import {LogInActionsType, AddDataActionsType} from "./types"

export const saveToken=(note:string):LogInActionsType=>({
    type: "SET_LOG_IN",
    payload : note
})

export const addData = (data:any):AddDataActionsType=>({
    type:"ADD_DATA",
    payload: data
})
