import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'

import Login from './pages/Login'
// import Navigation from './containers/Navigation'

function App() {
    return (
        <BrowserRouter>
            {/* <Navigation /> */}
            <Switch>
                <Route exact to="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
