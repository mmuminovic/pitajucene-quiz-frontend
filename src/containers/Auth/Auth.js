import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, login } from '../../store/actions/index';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import classes from './Auth.module.css';
import logo from '../../images/logo.png';
import Spinner from '../Spinner/Spinner';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../../setAuthToken';
import store from '../../store';
import { setCurrentUser } from '../../store/actions/auth';

class Auth extends Component {
    state = {
        loginPage: true,
        isAuth: false,
        errorMessage: null,
        showError: false,
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        loading: false
    }

    signupHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const data = {
            fullName: this.state.fullName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        axios.post('/signup', data)
            .then(result => {
                if (result.data.error) {
                    this.setState({ errorMessage: result.data.error, loading: false })
                } else {
                    this.setState({ loginPage: true, errorMessage: null, loading: false });
                }
            })
    }

    loginHandler = () => {
        this.setState({ loading: true });
        const authData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/login', authData)
            .then(result => {
                if (result.data.message) {
                    this.setState({ errorMessage: result.data.message, loading: false });
                } else {
                    const { token } = result.data;
                    localStorage.setItem('token', token);
                    setAuthToken(token);
                    try {
                        const decoded = jwt_decode(token);
                        store.dispatch(setCurrentUser(decoded));
                        this.props.history.push('/');
                    } catch (err) {

                    }
                }
                this.setState({ loading: false });
            })
    }

    switchHandler = () => {
        const loginPage = this.state.loginPage;
        this.setState({ loginPage: !loginPage });
    }

    keyPressed = (event) => {
        if (event.key === 'Enter' && this.state.loginPage) {
            this.loginHandler();
        } else if (event.key === 'Enter' && !this.state.loginPage) {
            this.signupHandler();
        }
    }

    render() {
        let fullName, confirmPassword, errorOrLoading;
        if (!this.state.loading) {
            errorOrLoading = <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{this.state.errorMessage}</p>;
        } else {
            errorOrLoading = <Spinner />
        }
        if (!this.state.loginPage) {
            fullName = <input value={this.state.fullName} onChange={(event) => this.setState({ fullName: event.target.value })} placeholder="Ime i prezime" />;
            confirmPassword = <input type="password" value={this.state.confirmPassword} onChange={(event) => this.setState({ confirmPassword: event.target.value })} placeholder="Ponovi šifru" />;
        }
        return (
            <div className={classes.MainPage} >
                <Navigation isAuth={this.state.isAuth} logout={() => this.props.logout()} />
                <div className={classes.Contents}>
                    <p style={{ fontSize: 'medium', fontWeight: 'bold', color: '#5696BC', margin: '0' }}>Islamski kviz znanja - pitajucene.com</p>
                    <div>
                        <img src={logo} alt="logo" style={{ width: '80px' }} />
                    </div>
                    <p style={{ fontSize: 'medium', fontWeight: 'bold', width: '45%', color: '#F39D41', margin: '0 auto', border: '1px solid #F39D41' }}>{this.state.loginPage ? 'Prijavljivanje' : 'Registracija'}</p>
                    {errorOrLoading}
                    <div>
                        {fullName}
                    </div>
                    <div>
                        <input onKeyPress={this.keyPressed} type="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} placeholder="Email" />
                    </div>
                    <div>
                        <input onKeyPress={this.keyPressed} type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} placeholder="Šifra" />
                    </div>
                    <div>
                        {confirmPassword}
                    </div>
                    <div>
                        <button className={classes.Button} onClick={this.state.loginPage ? this.loginHandler : this.signupHandler}>{this.state.loginPage ? 'Prijavi se' : 'Registruj se'}</button>
                    </div>
                    <div className={classes.Link} >
                        {this.state.loginPage ? <Link to="/prijava" onClick={this.switchHandler} style={{ fontSize: 'medium', fontWeight: 'bold', color: '#E04836', margin: '0' }}>Nemaš profil? Klikni i registruj se</Link> : <Link style={{ fontSize: 'medium', fontWeight: 'bold', color: '#E04836', margin: '0' }} to="/prijava" onClick={this.switchHandler}>Imaš profil? Klikni i prijavi se</Link>}
                    </div>
                    <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'white' }}>- Učesnici kviza sa neispravnom email adresom gube pravo na nagradu.</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        login: (email, password) => dispatch(login(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);