import {AddDataActionsType,DataStateType,ClearDataType} from "./types"

const initialState: DataStateType ={
    videoDetails: ""
}


export const dataReducer = (state:DataStateType =initialState, action:AddDataActionsType|ClearDataType)=>{    
    switch(action.type){
        case "ADD_VIDEO":{
            console.log("add data")
            return {...state, videoDetails: action.payload }
        }   
        case "CLEAR":{
            console.log("add data")
            return {state:initialState }
        }          
        default: {
            return state
        }
    }

}
