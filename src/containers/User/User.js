import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './User.module.css';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

class User extends Component {
    state = {
        fullName: '',
        email: '',
        newPassword: '',
        currentScore: 0,
        lastMonthScore: 0,
        theBestScore: 0,

        games: null,
        numOfGames: null,

        editMode: false,
        error: null,
        loading: false,
        updating: false,

        quizRemaining: false
    }

    componentDidMount() {
        if (this.props.user.userId === this.props.match.params.userId || this.props.isAdmin) {
            this.getUserInfo();
            this.getCurrentScore();
            this.getLastMonthScore();
            this.getMyBestScore();
        } else {
            this.props.history.push('/ranglista');
        }
    }

    getUserInfo = () => {
        this.setState({ loading: true });
        const userId = this.props.match.params.userId;
        axios.get(`/users/${userId}`)
            .then(result => {
                const data = result.data;
                const quizFound = data.quiz.find(q => !q.timeIsUp && !q.incorrect);
                if (quizFound) {
                    this.setState({ quizRemaining: true })
                }
                this.setState({ email: data.user.email, fullName: data.user.fullName, games: data.quiz, numOfGames: data.numOfGames, loading: false })
            })
    }

    getCurrentScore = () => {
        const userId = this.props.match.params.userId;
        axios.get(`/myscore/${userId}`)
            .then(result => {
                if (result.data.score) {
                    this.setState({ currentScore: result.data.score });
                }
            })
    }

    getLastMonthScore = () => {
        const userId = this.props.match.params.userId;
        axios.get(`/scorelastmonth/${userId}`)
            .then(result => {
                if (result.data.score) {
                    this.setState({ lastMonthScore: result.data.score });
                }
            })
    }

    getMyBestScore = () => {
        const userId = this.props.match.params.userId;
        axios.get(`/thebestscore/${userId}`)
            .then(result => {
                if (result.data.score) {
                    this.setState({ theBestScore: result.data.score });
                }
            })
    }

    editUser = () => {
        this.setState({ updating: true });
        axios.patch(`/user/${this.props.match.params.userId}`, { password: this.state.newPassword })
            .then(result => {
                if (result.data.error) {
                    this.setState({ error: result.data.error, updating: false });
                } else {
                    this.setState({ editMode: false, error: null, updating: false });
                }
            })
    }


    render() {
        let games, inputPassword, button, quizRemaining;

        if (this.state.loading) {
            games = <Spinner />;
        }

        if (this.state.quizRemaining) {
            quizRemaining = <p style={{color: 'red', fontSize: 'small', fontWeight: 'bold', margin: '0', backgroundColor: 'transparent'}}>Imate nezavršen kviz. Skrolajte na dole, pronađite ga i nastavite.</p>
        }

        if (this.state.editMode) {
            inputPassword = <input style={{ width: '30%', borderRadius: '10px' }} type="password" value={this.state.newPassword} onChange={(event) => this.setState({ newPassword: event.target.value })} />;
            button = <button onClick={this.editUser}>Potvrdi</button>;
        } else {
            button = <button onClick={() => this.setState({ editMode: true })}>Promijeni šifru</button>;
        }

        if (this.state.updating) {
            inputPassword = <Spinner />;
        }

        if (this.state.games) {
            if (this.state.games.length > 0) {
                let wrongAnswers = this.state.games.map((q, i) => {
                    if (q.questionText && q.incorrect) {
                        return (
                            <li key={i}>
                                <p>{q.time}</p>
                                <p>Pitanje:</p>
                                <p className={classes.Question}>{q.questionText}</p>
                                <p>Tačan odgovor možete naći na linku: <a href={q.questionLink} target="_blank" rel="noopener noreferrer">{q.questionLink}</a></p>
                                <p>Ostvareni rezultat: {q.score}</p>
                            </li>
                        )

                    } else if (!q.incorrect && q.score === 460) {
                        return (
                            <li key={i}>
                                <p>{q.time}</p>
                                <p className={classes.Question}>Osvojili ste maksimalan broj bodova. Čestitamo!</p>
                                <p>Ostvareni rezultat: {q.score}</p>
                            </li>
                        )

                    } else if (!q.timeIsUp) {
                        const link = `/quiz/${q.questionLink}`;
                        return (
                            <li key={i}>
                                <p>{q.time}</p>
                                <p className={classes.Question}>{q.questionText}</p>
                                <div className={classes.Field}>
                                    {this.props.match.params.userId === this.props.user.userId ? <Link to={link}><button style={{ backgroundColor: '#4CAF50', border: '#4CAF50', margin: '5px' }}>Nastavi kviz</button></Link> : <button style={{ backgroundColor: '#4CAF50', border: '#4CAF50', margin: '5px' }}>Kviz u toku</button>}
                                </div>
                            </li>
                        )

                    } else if (q.timeIsUp && !q.incorrect) {
                        return (
                            <li key={i}>
                                <p>{q.time}</p>
                                <p className={classes.Question}>{q.questionText}</p>
                                <p>Ostvareni rezultat: {q.score}</p>
                            </li>
                        )
                    }
                    return null;
                });
                games = (
                    <ul className={classes.List}>
                        {wrongAnswers}
                    </ul>
                )
            } else {
                games = <p style={{ color: 'red', fontWeight: 'bold' }}>Niste još nijednom pogriješili.</p>
            }
        }
        let errorMessage;
        if (this.state.error) {
            errorMessage = <p style={{ color: 'red' }}>{this.state.error}</p>;
        }

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <div className={classes.Heading}>
                            <p style={{ fontSize: 'medium', fontWeight: 'bold', color: 'rgb(102,149,204)' }}>Profil korisnika: {this.state.fullName}</p>
                            {quizRemaining}
                        </div>
                    </Col>
                    <Col md={4} style={{ margin: '10px 0' }}>
                        <div className={classes.Field}>
                            <p className={classes.Title}>Ime korisnika: </p>
                            <p>{this.state.fullName}</p>
                        </div>
                    </Col>
                    <Col md={4} style={{ margin: '10px 0' }}>
                        <div className={classes.Field}>
                            <p className={classes.Title}>Email: </p>
                            <p>{this.state.email}</p>
                        </div>
                    </Col>
                    <Col md={4} style={{ margin: '10px 0' }}>
                        <div className={classes.Field}>
                            <p className={classes.Title}>Broj odigranih kvizova: </p>
                            <p>{this.state.numOfGames}</p>
                        </div>
                    </Col>
                    <Col md={4} style={{ margin: '10px 0' }}>
                        <div className={classes.Field}>
                            <p className={classes.Title}>Najbolji rezultat ovog mjeseca:</p>
                            <p>{this.state.currentScore}</p>
                        </div>
                    </Col>
                    <Col md={4} style={{ margin: '10px 0' }}>
                        <div className={classes.Field}>
                            <p className={classes.Title}>Najbolji rezultat prošlog mjeseca: </p>
                            <p>{this.state.lastMonthScore}</p>
                        </div>
                    </Col>
                    <Col md={4} style={{ margin: '10px 0' }}>
                        <div className={classes.Field}>
                            <p className={classes.Title}>Najbolji rezultat ikad: </p>
                            <p>{this.state.theBestScore}</p>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className={classes.Field}>
                            <p className={classes.Title}>Šifra: </p>
                            {errorMessage}
                            {inputPassword}
                            {button}
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className={classes.Games}>
                            <p className={classes.Title} style={{ fontSize: 'medium', fontWeight: 'bold', color: 'rgb(102,149,204)', margin: '0' }}>Odigrani kvizovi</p>
                            <p style={{ fontWeight: '500' }}>Učite iz svojih grešaka. Pogledajte pitanja na koja ste dali netačan odgovor i pronađite tačan odgovor na datom linku.</p>
                            {games}
                        </div>
                    </Col>
                </Row>
            </Container >
        )
    }
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, null)(User);