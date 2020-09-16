import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'

axios.defaults.headers.common.Authorization =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjVlMTg3NmY3ZDdmZDY2MDAxNzFlMzA2MSIsImZ1bGxOYW1lIjoiVGVzdCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MDAyNjA0MzIsImV4cCI6MTYwMDM0NjgzMn0.cMvkuQ1_mztPoeA2GuAbC3aoAz1qohgEiChZeb6FFXo'
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`

ReactDOM.render(<App />, document.getElementById('root'))
