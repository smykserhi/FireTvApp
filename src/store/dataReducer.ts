import {AddDataActionsType,DataStateType} from "./types"

const initialState: DataStateType ={
    videoDetails: ""
}


export const dataReducer = (state:DataStateType =initialState, action:AddDataActionsType)=>{    
    switch(action.type){
        case "ADD_VIDEO":{
            console.log("add data")
            return {...state, videoDetails: action.payload }
        }        
        default: {
            return state
        }
    }

}
