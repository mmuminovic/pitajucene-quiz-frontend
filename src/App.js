import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'
import jwtDecode from 'jwt-decode'
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import Game from './pages/Game'
import Ranking from './pages/Ranking'
import Navigation from './containers/Navigation'
import { store } from './store'
import { authSlice } from './store/authSlice'
import { Profile } from './pages/Profile'

const lsTest = () => {
    const test = 'test'
    try {
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        return true
    } catch (e) {
        return false
    }
}

if (lsTest() === true) {
    if (
        localStorage.auth_token !== undefined &&
        localStorage.auth_token !== '' &&
        localStorage.auth_token !== 'undefined'
    ) {
        const decoded = jwtDecode(localStorage.auth_token)

        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
            store.dispatch(authSlice.actions.auth())
            window.location.href = '/login'
        } else {
            store.dispatch(
                authSlice.actions.auth({ token: localStorage.auth_token })
            )
        }
    } else {
        store.dispatch(authSlice.actions.auth())
    }
} else {
    store.dispatch(authSlice.actions.auth())
}

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route exact path="/game" component={Game} />
                <Route exact path="/ranking" component={Ranking} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/" component={Homepage} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
