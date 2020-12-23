import {LogInActionsType,LogInStateType} from "./types"


const initialState: LogInStateType ={
    token:""
}

export const logInReducer = (state:LogInStateType =initialState, action:LogInActionsType)=>{    
    switch(action.type){
        case "SET_LOG_IN":{
            console.log("Set token")
            return {...state, token : action.payload }
        }        
        default: {
            return state
        }
    }

}
