import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import axios from 'axios'
import { store } from './store'
import { authSlice } from './store/authSlice'

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            store.dispatch(authSlice.actions.auth())
        }
        if (error.response.status === 403) {
            window.history.go(-1)
        }
        return error
    }
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
