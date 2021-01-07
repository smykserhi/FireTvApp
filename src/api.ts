import { domain } from './constants';
import axios from 'axios';

const fetchConfig = {
    method: "GET",
    headers: {
        Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    //body: "",
  };

let api = {
    login: (email: string, password: string) => {
        return axios.post(`${domain}/api/sessions`, { email, password });
    },
    logout: (token: string): void => {
        axios.delete(`${domain}/api/sessions`, {
            headers: {
                Authorization: token
            }
        });
    },
    /*//https://speedsport.tv/api/v2/pages/*
    getPages: () =>{
        return axios.get(`${domain}/api/v2/pages`)
    },
    //https://speedsport.tv/api/v2/categories?offset=0&limit=10&page=45
    getPageContent: (page:number,  limit:number=10, offset:number=0 )=>{
        return axios.get(`${domain}/api/v2/categories?page=${page}offset=${offset}&limit=${limit}&`)            
    },
    //https://speedsport.tv/api/v2/categories/1646?offset=0&limit=10
    getCategoriContent: (category:number, limit:number=10, offset:number=0 )=>{
        return axios.get(`${domain}/api/v2/categories/${category}?offset=${offset}&limit=${limit}`)
    }*/
    getPages: async() =>{
        return await fetch(`${domain}/api/v2/pages`, fetchConfig).then((res)=> res.json())
    },
    getPageContent: async(page:number,  limit:number=10, offset:number=0 )=>{
        return await fetch(`${domain}/api/v2/categories?page=${page}offset=${offset}&limit=${limit}&`,fetchConfig).then((res)=> res.json())           
    },
    getCategoriContent: async(category:number, limit:number=10, offset:number=0 )=>{
        return await fetch(`${domain}/api/v2/categories/${category}?offset=${offset}&limit=${limit}`, fetchConfig).then((res)=> res.json())
    }


}

export default api