import {LogInActionsType,LogInStateType, UserActionsType, UserLogOutType} from "./types"


const initialState: LogInStateType ={
    token:"",
    userName: "",
}

export const logInReducer = (state:LogInStateType =initialState, action:LogInActionsType | UserActionsType|UserLogOutType)=>{    
    switch(action.type){
        case "SET_LOG_IN":{
            console.log("Set token")
            return {...state, token : action.payload }
        }    
        case "SET_USER_NAME":{
            console.log("Set User Name")
            return {...state, userName : action.payload }
        }   
        case "LOG_OUT":{
            console.log("Set User Name")
            return {state: initialState }
        }        
        default: {
            return state
        }
    }

}
