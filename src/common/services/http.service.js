import axios from 'axios'

// Environment
import {env} from '../environment/environment'

export class HttpService {

    getAddresses() {
        return axios(env.apiUrl + "/addresses", {
            method: 'GET',
        })
    }

    sendAddress(address) {
        return axios(env.apiUrl + "/addresses/add", {
            method: 'GET',
            params: {
                address
            }
        })
    }

    post(url, data) {
        return axios(env.apiUrl + url, {
            data,
            method: 'POST',
        })
    }

    put(url, data) {
        return axios(env.apiUrl + url, {
            data,
            method: 'PUT',
        })
    }

    patch(url, data) {
        return axios(env.apiUrl + url, {
            data,
            method: 'PATCH',
        })
    }

    delete(url, data) {
        return axios(env.apiUrl + url, {
            data,
            method: 'DELETE',
        })
    }
}

export default new HttpService()
