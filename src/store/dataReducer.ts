import {AddDataActionsType,DataStateType} from "./types"

const initialState: DataStateType ={
    data: []
}


export const dataReducer = (state:DataStateType =initialState, action:AddDataActionsType)=>{    
    switch(action.type){
        case "ADD_DATA":{
            console.log("add data")
            return {...state, data: action.payload }
        }        
        default: {
            return state
        }
    }

}
