import { RouteComponentProps } from 'react-router';
import {page} from "../componets/Home"


//Actions types
export type LogInActionsType = {type: "SET_LOG_IN" , payload?: string }
export type UserActionsType = {type: "SET_USER_NAME" , payload?: string }
export type AddDataActionsType = {type: "ADD_DATA" , payload?: string}

//State types
export interface LogInStateType {
    token:string,  
    userName: string     
}
export interface DataStateType {
    UserLogin:string      
}


//Storage types
export interface StorageType {
    data:DataStateType,
    logIn:LogInStateType
  }
  

//Components Types
export type RouterProps = RouteComponentProps ;