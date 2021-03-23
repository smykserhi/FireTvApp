import { RouteComponentProps } from 'react-router';
import {videoDisListType} from "../componets/Home"


//Actions types
export type LogInActionsType = {type: "SET_LOG_IN" , payload?: string }
export type UserActionsType = {type: "SET_USER_NAME" , payload?: string }
export type UserLogOutType = {type: "LOG_OUT" }


export type AddDataActionsType = {type: "ADD_VIDEO" , payload: videoDisListType}
export type ClearDataType = {type: "CLEAR_VIDEO_DIS"}
export type AddSearchType = {type: "ADD_SEARCH", payload: string}
export type ClerSearchType = {type: "CLEAR_SEARCH"}

//State types
export interface LogInStateType {
    token:string,  
    userName: string     
}
export interface DataStateType {
    videoDetails:any ,
    search: string
}


//Storage types
export interface StorageType {
    data:DataStateType,
    logIn:LogInStateType
  }
  

//Components Types
export type RouterProps = RouteComponentProps ;