import axiosLib from 'axios'

const axios = axiosLib.create({
    baseURL: 'http://localhost:3002',
})

export { axios }
