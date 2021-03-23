import { dataReducer } from './dataReducer';
import { logInReducer } from './logInReduser';
import {createStore, combineReducers} from  "redux"
import { composeWithDevTools } from 'redux-devtools-extension';



const allRedusers = combineReducers({
    data: dataReducer,
    logIn: logInReducer
})
//have to be delete in prodaction  composeWithDevTools( )
export const store = createStore(allRedusers, composeWithDevTools( ))

