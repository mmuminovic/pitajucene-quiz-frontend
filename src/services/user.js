import axios from 'axios'

export const login = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await axios.post('/user/login', data)
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })

export const signup = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await axios.post('/user/signup', data)
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })