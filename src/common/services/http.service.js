import axios from 'axios'

// Environment
import {env} from '../environment/environment'

export class HttpService {

    config = {
        headers: {'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept, true'}
    };

    getNewBlocksFromAPI() {
        return axios(env.apiBlockChain + "/blocks/?format=json", {
            method: 'GET',
            params: {cors: true}
        })
    }

    getAddresses() {
        return axios(env.apiUrl + "/addresses", {
            method: 'GET',
            ...this.config
        })
    }

    sendAddress(address) {
        return axios(env.apiUrl + "/addresses/add", {
            method: 'GET',
            params: {
                address
            },
            ...this.config
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
