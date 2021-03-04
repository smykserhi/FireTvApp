import { RouteComponentProps } from 'react-router';
import {videoDisListType} from "../componets/Home"


//Actions types
export type LogInActionsType = {type: "SET_LOG_IN" , payload?: string }
export type UserActionsType = {type: "SET_USER_NAME" , payload?: string }
export type UserLogOutType = {type: "LOG_OUT" }
export type AddDataActionsType = {type: "ADD_VIDEO" , payload: videoDisListType}
export type ClearDataType = {type: "CLEAR"}

//State types
export interface LogInStateType {
    token:string,  
    userName: string     
}
export interface DataStateType {
    videoDetails:any 
}


//Storage types
export interface StorageType {
    data:DataStateType,
    logIn:LogInStateType
  }
  

//Components Types
export type RouterProps = RouteComponentProps ;