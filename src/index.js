import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import axios from 'axios'
import { store } from './store'

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
