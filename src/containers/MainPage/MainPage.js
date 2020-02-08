import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom';
import { logoutUser, login } from '../../store/actions/index';
import Aux from 'react-aux'
// import axios from 'axios';
// import Navigation from '../Navigation/Navigation';
import Auth from '../Auth/Auth';
import Quiz from '../Quiz/Quiz';
import Ranking from '../Ranking/Ranking';
import Users from '../Users/Users';
// import classes from './MainPage.module.css';
import Questions from '../Questions/Questions';
import EditForm from '../EditForm/EditForm';
import User from '../User/User';
import Reports from '../Reports/Reports';
import Quotes from '../Quotes/Quotes';
// import logo from '../../images/logo.png';

class MainPage extends Component {
    render() {
        // console.log(this.props);
        return (
            <Aux>
                {this.props.isAdmin ?
                    <Switch>
                        <Route path="/korisnik/:userId" component={User} />
                        <Route path="/korisnici" component={Users} />
                        <Route path="/primjedbe" component={Reports} />
                        <Route path="/sva-pitanja" component={Questions} />
                        <Route path="/citati" exact component={Quotes} />
                        <Route path="/input" exact component={EditForm} />
                        <Route path="/input/:questionId" component={EditForm} />
                        <Route path="/prijava" component={Auth} />
                        <Route path="/ranglista" component={Ranking} />
                        <Route path="/quiz/:quizId" exact component={Quiz} />
                        <Route path="/" exact component={Quiz} />
                    </Switch>
                    :
                    <Switch>
                        <Route path="/prijava" component={Auth} />
                        {!this.props.isAuth ? <Redirect to="/prijava" /> : null}
                        <Route path="/ranglista" component={Ranking} />
                        <Route path="/korisnik/:userId" component={User} />
                        <Route path="/quiz/:quizId" exact component={Quiz} />
                        <Route path="/" exact component={Quiz} />
                    </Switch>
                }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));