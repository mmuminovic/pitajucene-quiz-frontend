import React, { Component } from 'react';
import classes from './User.module.css';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import timeIcon from '../../images/clock.png';
import star from '../../images/star.png';
import winnerIcon from '../../images/0.png';

import axios from 'axios';

class User extends Component {
    state = {
        fullName: '',
        email: '',
        isWinner: false,
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
                this.setState({ email: data.user.email, fullName: data.user.fullName, isWinner: data.user.isWinner, games: data.quiz, numOfGames: data.numOfGames, loading: false })
            })
    }

    getCurrentScore = () => {
        const userId = this.props.match.params.userId;
        axios.get(`/myscore/${userId}`)
            .then(result => {
                if (result.data.score) {
                    this.setState({ currentScore: result.data });
                }
            })
    }

    getLastMonthScore = () => {
        const userId = this.props.match.params.userId;
        axios.get(`/scorelastmonth/${userId}`)
            .then(result => {
                if (result.data.score) {
                    this.setState({ lastMonthScore: result.data });
                }
            })
    }

    getMyBestScore = () => {
        const userId = this.props.match.params.userId;
        axios.get(`/thebestscore/${userId}`)
            .then(result => {
                if (result.data.score) {
                    this.setState({ theBestScore: result.data });
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

    changeWinnerStatus = () => {
        axios.patch(`/set-winner/${this.props.match.params.userId}`).then(result => {
            this.setState({ isWinner: result.data.isWinner });
        });
    }


    render() {
        let games, inputPassword, button, quizRemaining;

        if (this.state.loading) {
            games = <Spinner />;
        }

        if (this.state.quizRemaining) {
            quizRemaining = (
                <tr>
                    <th colSpan="2" style={{ backgroundColor: '#cc6a66', padding: '10px' }}>Imate nezavršen kviz. Skrolajte na dole, pronađite ga i nastavite.</th>
                </tr>
            )
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
                            <li key={i} style={{ backgroundColor: '#cc6a66' }}>
                                <p>{q.time}</p>
                                <p>Pitanje:</p>
                                <p className={classes.Question}>{q.questionText}</p>
                                <p>Tačan odgovor možete naći na linku: <a href={q.questionLink} target="_blank" rel="noopener noreferrer">{q.questionLink}</a></p>
                                <span>Ostvareni rezultat:</span><span><img src={star} alt="medal" style={{ width: '12px', marginLeft: '5px', marginRight: '5px' }} /></span><span style={{ paddingTop: '15px' }}>{q.score}</span>
                            </li>
                        )

                    } else if (!q.incorrect && q.score === 900) {
                        return (
                            <li key={i} style={{ backgroundColor: '#4CAF50' }}>
                                <p>{q.time}</p>
                                <p className={classes.Question}>Osvojili ste maksimalan broj bodova. Čestitamo!</p>
                                <span>Ostvareni rezultat:</span><span><img src={star} alt="medal" style={{ width: '12px', marginLeft: '5px', marginRight: '5px' }} /></span><span style={{ paddingTop: '15px' }}>{q.score}</span>
                            </li>
                        )

                    } else if (!q.timeIsUp) {
                        const link = `/quiz/${q.questionLink}`;
                        return (
                            <li key={i} style={{ backgroundColor: '#5696BC' }}>
                                <p>{q.time}</p>
                                <p className={classes.Question}>{q.questionText}</p>
                                <div className={classes.Field}>
                                    {this.props.match.params.userId === this.props.user.userId ? <Link to={link}><button style={{ backgroundColor: '#4CAF50', border: '#4CAF50', margin: '5px' }}>Nastavi kviz</button></Link> : <button style={{ backgroundColor: '#4CAF50', border: '#4CAF50', margin: '5px' }}>Kviz u toku</button>}
                                </div>
                            </li>
                        )

                    } else if (q.timeIsUp && !q.incorrect) {
                        return (
                            <li key={i} style={{ backgroundColor: '#6795cc' }}>
                                <p>{q.time}</p>
                                <p className={classes.Question}>{q.questionText}</p>
                                <span>Ostvareni rezultat:</span><span><img src={star} alt="medal" style={{ width: '12px', marginLeft: '5px', marginRight: '5px' }} /></span><span style={{ paddingTop: '15px' }}>{q.score}</span>
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
            <div className={classes.Heading}>
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ paddingTop: '15px' }}>
                                <p>Profil korisnika: {this.state.fullName}</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <p>Ime korisnika: </p>
                            </th>
                            <td>
                                <p>{this.state.fullName}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <p>Email: </p>
                            </th>
                            <td>
                                <p>{this.state.email}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <p>Broj odigranih kvizova: </p>
                            </th>
                            <td>
                                <p>{this.state.numOfGames}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <p>Najbolji rezultat ovog mjeseca:</p>
                            </th>
                            <td>
                                <img src={star} alt="medal" style={{ width: '20px', marginLeft: '15px', marginRight: '5px' }} />
                                <span>{this.state.currentScore.score}</span>
                                <img src={timeIcon} alt="medal" style={{ width: '20px', marginLeft: '15px', marginRight: '5px' }} />
                                <span>{this.state.currentScore.duration}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <p>Najbolji rezultat prošlog mjeseca: </p>
                            </th>
                            <td>
                                <img src={star} alt="medal" style={{ width: '20px', marginLeft: '15px', marginRight: '5px' }} />
                                <span>{this.state.lastMonthScore.score}</span>
                                <img src={timeIcon} alt="medal" style={{ width: '20px', marginLeft: '15px', marginRight: '5px' }} />
                                <span>{this.state.lastMonthScore.duration}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <p>Najbolji rezultat ikad: </p>
                            </th>
                            <td>
                                <img src={star} alt="medal" style={{ width: '20px', marginLeft: '15px', marginRight: '5px' }} />
                                <span>{this.state.theBestScore.score}</span>
                                <img src={timeIcon} alt="medal" style={{ width: '20px', marginLeft: '15px', marginRight: '5px' }} />
                                <span>{this.state.theBestScore.duration}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <p>Šifra</p>
                            </th>
                            <td>
                                <p className={classes.Title}>Šifra: </p>
                                {errorMessage}
                                {inputPassword}
                                {button}
                            </td>
                        </tr>
                        {quizRemaining}
                    </tbody>
                </table>
                {!this.state.isWinner ?
                    <div>
                        {this.props.user.isAdmin ? <img src={winnerIcon} alt="medal" style={{ width: '20px', marginTop: '20px', padding: '0', cursor: 'pointer' }} onClick={this.changeWinnerStatus} /> : null}
                    </div> :
                    <div className={classes.List} style={{ margin: '20px', padding: '0', height: 'auto' }}>
                        <img src={winnerIcon} alt="medal" style={{ width: '20px', marginLeft: '15px', marginRight: '5px' }} />
                        <span>Korisnik je pobijedio u kvizu</span>
                        <div>
                            {this.props.user.isAdmin ? <button onClick={this.changeWinnerStatus}>Ukloni pobjednika</button> : null}
                        </div>
                    </div>}
                <table className={classes.Table} style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#4CAF50', padding: '10px 0' }}>
                                Odigrani kvizovi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '5px 0' }}>Pogledajte pitanja na koja ste dali netačan odgovor i pronađite tačan odgovor na datom linku.</td>
                        </tr>
                    </tbody>
                </table>
                {games}
            </div >
        )
    }
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, null)(User);