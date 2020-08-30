import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'

import Login from './pages/Login'
import Register from './pages/Register'
// import Navigation from './containers/Navigation'

function App() {
    return (
        <BrowserRouter>
            {/* <Navigation /> */}
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
