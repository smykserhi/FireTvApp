import { RouteComponentProps } from 'react-router';


//Actions types
export type LogInActionsType = {type: "SET_LOG_IN" , payload?: any }
export type AddDataActionsType = {type: "ADD_DATA" , payload?: any}

//State types
export interface LogInStateType {
    token:string,       
}
export interface DataStateType {
    data:{},       
}


//Storage types
export interface StorageType {
    data:DataStateType,
    logIn:LogInStateType
  }
  

//Components Types
export type RouterProps = RouteComponentProps ;