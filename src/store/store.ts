import { dataReducer } from './dataReducer';
import { logInReducer } from './logInReduser';
import {createStore, combineReducers} from  "redux"
import { composeWithDevTools } from 'redux-devtools-extension';



const allRedusers = combineReducers({
    data: dataReducer,
    logIn: logInReducer
})

export const store = createStore(allRedusers, composeWithDevTools( ))

