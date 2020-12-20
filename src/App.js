import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import Game from './pages/Game'
import Ranking from './pages/Ranking'
import Navigation from './containers/Navigation'
import Profile from './pages/Profile'
import About from './pages/About'

function App() {
    return (
        <HashRouter>
            <Navigation />
            <Switch>
                <Route exact path="/game" component={Game} />
                <Route exact path="/ranking" component={Ranking} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/about" component={About} />
                <Route exact path="/" component={Homepage} />
            </Switch>
        </HashRouter>
    )
}

export default App
