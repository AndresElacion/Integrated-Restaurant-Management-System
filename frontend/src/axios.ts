import axios from 'axios'

const URL = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default URL;