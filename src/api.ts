import {  domain } from './constants';
import axios from 'axios';


let api = {
    login: (email: string, password: string) => {
        return axios.post(`${domain}/api/sessions`, { email, password });
    },
    // saveToken: (token:string) => {
    //     let tokens;
    //     try {
    //         tokens = JSON.parse(localStorage.tokens);
    //     } catch (err) {
    //         tokens = {};
    //     }
    //     tokens[host] = token;
    //     localStorage.tokens = JSON.stringify(tokens);
    // },


}

export default api