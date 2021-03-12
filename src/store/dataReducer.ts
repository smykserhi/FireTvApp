import {AddDataActionsType,DataStateType,ClearDataType, AddSearchType, ClerSearchType} from "./types"

const initialState: DataStateType ={
    videoDetails: "",
    search: ""
}


export const dataReducer = (state:DataStateType =initialState, action:AddDataActionsType|ClearDataType| AddSearchType|ClerSearchType)=>{    
    switch(action.type){
        case "ADD_VIDEO":{
            console.log("add VIDEO to Redux")
            return {...state, videoDetails: action.payload }
        }   
        case "CLEAR_VIDEO_DIS":{     
            console.log("clear VIDEO to Redux")       
            return {state:initialState }
        }     
        case "ADD_SEARCH":
            console.log("Add Search to Redux")  
            return {...state, search :action.payload}   
        case "CLEAR_SEARCH": 
            return{...state, search: ""}
        default: {
            return state
        }
    }

}
