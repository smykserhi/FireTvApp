import { domain } from './constants';
import axios from 'axios';

const fetchConfig = (token = "", met = "GET") => {
    return {
        method: met,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        },
    }

}
const TimotfetchConfig = (data: {}) => {
    return {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
}


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

    getPages: async () => {
        return await fetch(`${domain}/api/v2/pages`, fetchConfig())
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    getPageContent: async (page: string, limit: number = 10, offset: number = 0) => {
        return await fetch(`${domain}/api/v2/categories?page=${page}&offset=${offset}&limit=${limit}&`, fetchConfig())
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    getCategoriContent: async (category: number, limit: number = 20, offset: number = 0) => {
        return await fetch(`${domain}/api/v2/categories/${category}?offset=${offset}&limit=${limit}`, fetchConfig())
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    searchContent: (qwery: string, limit: number = 20, offset: number = 0) => {
        return fetch(`${domain}/api/v2/content_items/search?q=${qwery}&offset=${offset}&limit=${limit}`, fetchConfig())
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    getMyList: (token: string, offset: number = 0, limit: number = 20) => {
        return fetch(`${domain}/api/v2/list?offset=${offset}&limit=${limit}`, fetchConfig(token))
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    addToMyList: (token: string, id: string) => {
        return fetch(`${domain}/api/v2/list/${id}`, fetchConfig(token, "POST"))
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    removeFromMyList: (token: string, id: string) => {
        return fetch(`${domain}/api/v2/list/${id}`, fetchConfig(token, "DELETE"))
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    getVideoItem: (token: string, id: string) => {
        return fetch(`${domain}/api/v2/content_items/${id}`, fetchConfig(token))
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    getVideoItemNoLock: (token: string, id: string) => {
        return fetch(`${domain}/api/v2/content_items/${id}?lock=0`, fetchConfig(token))
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },
    getVideoItemState: (token: string, id: string) => {
        return fetch(`${domain}/api/v2/content_items/${id}/state`, fetchConfig(token))
            .then((res) => { if (!res.ok) { throw Error(res.statusText) } return res.json() })
    },

   



}

export default api