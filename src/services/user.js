import axios from 'axios'
import { store } from '../store'
import { authSlice } from '../store/authSlice'

export const login = async (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await axios.post('/user/login', data)
            console.log(user)
            const { token } = user.data
            store.dispatch(authSlice.actions.auth({ token }))
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
