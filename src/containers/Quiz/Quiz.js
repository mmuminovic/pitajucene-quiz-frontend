import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Quiz.module.css';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../images/logo.png';
import Spinner from '../Spinner/Spinner';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import timerClasses from './Timer.module.css';

class Quiz extends Component {
    state = {
        started: false,
        finished: false,
        quiz: null,
        gameover: false,
        incorrect: false,
        question: null,
        currentScore: 0,
        ans: null,
        message: null,
        loading: false,
        reportMode: false,
        reportMessage: '',
        errorMessage: '',
        continuing: false,
        remainingTime: 1800,
        quizNotActive: false,
        games: null,
        activeGames: null,
        quizPlayed: null
    }

    componentDidMount() {
        if (this.props.match.params.quizId) {
            this.setState({ loading: true })
            axios.post(`/quiz/${this.props.match.params.quizId}`, { continuing: true })
                .then(result => {
                    if (result.data.message) {
                        this.setState({ message: result.data.message, quizNotActive: true, loading: false, incorrect: true, started: false });
                    } else {
                        const data = result.data;
                        this.setState({ question: data.question, quiz: this.props.match.params.quizId, gameover: false, currentScore: data.score, ans: null, started: true, loading: true, finished: false, continuing: true, remainingTime: data.timeRemaining });
                    }
                })
        } else {
            this.getUserInfo();
            this.getNumOfActiveGames();
            this.getNumOfAllGames();
        }
    }

    getNumOfActiveGames = () => {
        axios.get('/active-games').then(result => {
            this.setState({ activeGames: result.data.activeGames })
        })
    }

    getNumOfAllGames = () => {
        axios.get('/num-of-games').then(result => {
            this.setState({ quizPlayed: result.data.quizPlayed })
        })
    }

    getUserInfo = () => {
        if (this.props.isAuth) {
            const userId = this.props.user.userId;
            axios.get(`/users/${userId}`)
                .then(result => {
                    const data = result.data;
                    this.setState({ games: data.quiz })
                })
        }
    }

    createQuiz = () => {
        axios.post('/create-quiz', { userId: this.props.user.userId })
            .then(result => {
                const data = result.data;
                this.setState({ question: data.firstQuestion, quiz: data.quiz, loading: false });
            });
    }

    submitAnswer = (ans) => {
        this.setState({ ans: ans, loading: true })
        axios.post(`/quiz/${this.state.quiz}`, { answer: ans })
            .then(result => {
                if (result.data.incorrect) {
                    this.setState({ gameover: true, incorrect: true, loading: false })
                } else if (result.data.gameover) {
                    if (result.data.finished) {
                        this.setState({ gameover: true, finished: true, incorrect: true, loading: false });
                    } else {
                        this.setState({ message: result.data.message, gameover: true, loading: false });
                    }
                    if (result.data.score) {
                        this.setState({ currentScore: result.data.score, loading: false })
                    }
                } else {
                    this.setState({
                        question: result.data.question,
                        gameover: result.data.gameover,
                        currentScore: result.data.score,
                        loading: false
                    });
                }
            })
    }

    playAgain = () => {
        this.setState({ gameover: false, currentScore: 0, ans: null, started: true, loading: true, finished: false });
        this.createQuiz();
    }

    closeModalHandler = () => {
        this.setState({ incorrect: false, started: false, finish: false, reportMode: false, loading: false });
    }

    reportModeHandler = () => {
        this.setState({ reportMode: !this.state.reportMode });
    }

    report = () => {
        const data = {
            reportedBy: this.props.user.userId,
            reportedQuestion: this.state.question.text,
            questionId: this.state.question.id,
            message: this.state.reportMessage,
            answer: this.state.ans
        };

        axios.post('/send-report', data)
            .then(result => {
                if (!result.data.error) {
                    this.setState({ reportMode: false, loading: false, incorrect: false, started: false, finish: false })
                } else {
                    this.setState({ errorMessage: result.data.error, loading: false })
                }
            })
    }


    render() {
        let question, questionText, answers, currentScore, gameover, modalDetails, quizDetails, points, timer, timerText, quizRemaining;
        const renderTime = value => {
            if (value === 0) {
                return <div className={timerClasses.timer}>0</div>;
            }

            return (
                <div className="timer">
                    {/* <div style={{ textAlign: 'center', marginBottom: '0' }}>Ostalo do kraja</div> */}
                    <div className={timerClasses.value}>{value}</div>
                    {/* <div style={{ textAlign: 'center' }}>sekundi</div> */}
                </div>
            );
        };

        currentScore = (
            <div className={classes.Score}>
                <p>Ostvareni rezultat: </p>
                <p>{this.state.currentScore}</p>
            </div>
        );
        if (this.state.loading) {
            questionText = <Spinner />;
        } else {
            questionText = null;
        }

        if (!this.state.started) {
            if (this.state.games) {
                const quizFound = this.state.games.find(q => !q.timeIsUp && !q.incorrect);
                if (quizFound) {
                    let myProfileLink = `/korisnik/${this.props.user.userId}`;
                    quizRemaining = (<Link style={{ color: 'red', fontWeight: 'bold' }} to={myProfileLink}>Imate kviz koji niste završili! Kliknite na ovaj link da nastavite.</Link>)
                }
            }
            quizDetails = (
                <div className={classes.Gameover}>
                    <p style={{ fontSize: 'medium', fontWeight: 'bold', color: 'rgb(102,149,204)', margin: '0' }}>Dobrodošli na islamski kviz znanja</p>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.pitajucene.com"><img src={Logo} width="100px" alt="logo" /></a>
                    </div>
                    {quizRemaining}
                    <div className={classes.Rules}>
                        <p style={{ fontSize: 'medium', fontWeight: 'bold' }}>Pravila igre:</p>
                        <p>- Kviz se sastoji od 60 pitanja i 3 nivoa:</p>
                        <table style={{ margin: '0 auto' }}>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '5px 10px' }}><em>20 pitanja od po 5 bodova</em></td>
                                    <td style={{ border: '1px solid black', padding: '5px 10px' }}><em>20 pitanja od po 8 bodova</em></td>
                                    <td style={{ border: '1px solid black', padding: '5px 10px' }}><em>20 pitanja od po 10 bodova</em></td>
                                </tr>
                            </tbody>
                        </table>
                        <p>- Kviz traje 30 minuta.</p>
                        <p>- Koje su nagrade ovog mjeseca možete vidjeti na našoj stranici <a href="https://pitajucene.com">pitajucene.com</a></p>
                        <p>- Najbolji u mjesecu će biti kontaktirani putem email adresa s kojom su se registrovali.</p>
                        <p style={{ fontWeight: 'bold' }}>- Učesnici kviza sa neispravnom email adresom gube pravo na nagradu.</p>
                    </div>
                    <Button clicked={this.playAgain} text="Pokreni kviz" />
                    <table style={{ margin: '0 auto' }}>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '5px 10px', fontWeight: 'bold' }}><em>Odigrano kvizova:</em></td>
                                <td style={{ border: '1px solid black', padding: '5px 10px', fontWeight: 'bold' }}><em>Trenutno igra:</em></td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '5px 10px', fontWeight: 'bold' }}><em>{this.state.quizPlayed}</em></td>
                                <td style={{ border: '1px solid black', padding: '5px 10px', fontWeight: 'bold' }}><em>{this.state.activeGames}</em></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
            if (this.state.quizNotActive) {
                modalDetails = (
                    <div className={classes.ModalInfo}>
                        <p style={{ fontWeight: '500' }}>{this.state.message}</p>
                        <div style={{ border: 'none' }} className={classes.Button}>
                            <Button clicked={this.closeModalHandler} text="Zatvori" />
                        </div>
                    </div>
                );
            }
            currentScore = null;
        } else if (this.state.finished) {
            modalDetails = (
                <div className={classes.ModalInfo}>
                    <p>Čestitamo! Stigli ste do kraja kviza.</p>
                    <p>Ostvareni rezultat: {this.state.currentScore}</p>
                    <div>
                        <p>Poslanik, sallallahu alejhi ve sellem, je rekao:</p>
                        <p style={{ textAlign: 'justify', padding: '0 15px', fontSize: 'small' }}>"Ko krene putem na kojem traži znanje, Allah će ga, doista, usmjeriti ka putu od puteva koji vode u Džennet. Doista meleki prostiru svoja krila od dragosti pred onim koji traži znanje..." (dio hadisa)</p>
                        <p>Hadis bilježe Ebu Davud, Tirmizi i drugi.</p>
                    </div>
                    <Button clicked={this.closeModalHandler} text="Nastavi" />
                </div>
            );
        } else if (this.state.question && !this.state.gameover) {
            question = this.state.question;
            questionText = (
                <div className={classes.Question}>
                    <p>{question.text}</p>
                </div>
            );
            timerText = <p className={classes.TimerText}>Tajmer se nalazi na dnu ekrana</p>;
            points = (<p style={{ textAlign: 'center', fontWeight: '500', margin: '0' }}>Tačan odgovor nosi: {question.points} bodova</p>);
            let answersArray = [
                <li key="4" onClick={() => this.submitAnswer(question.answer0)}>{question.answer0}</li>,
                <li key="1" onClick={() => this.submitAnswer(question.answer1)}>{question.answer1}</li>,
                <li key="2" onClick={() => this.submitAnswer(question.answer2)}>{question.answer2}</li>,
                <li key="3" onClick={() => this.submitAnswer(question.answer3)}>{question.answer3}</li>
            ];
            answers = (
                <div className={classes.Answers}>
                    <ul>
                        {answersArray}
                    </ul>
                </div>
            );
            timer = (
                <div>
                    <p style={{ textAlign: 'center', margin: '0', fontWeight: '500' }}>Prostalo vrijeme:</p>
                    <CountdownCircleTimer
                        isPlaying
                        durationSeconds={this.state.remainingTime}
                        colors={[["#0582ca"]]}
                        renderTime={renderTime}
                        onComplete={() => [false]}
                        size={65}
                    />
                </div>);
        } else if (this.state.gameover) {
            currentScore = null;
            gameover = (
                <div className={classes.Gameover}>
                    <p>{this.state.message}</p>
                    <Button clicked={this.playAgain} text="Igraj ponovo" />
                </div>
            );
            if (!this.state.reportMode) {
                modalDetails = (
                    <div className={classes.ModalInfo}>
                        <p>Pogriješili ste odgovor</p>
                        <p style={{ margin: '10px 0 0 0' }}>Na pitanje: </p>
                        <div>
                            <p style={{ textAlign: 'justify', margin: '10px' }}><strong>{this.state.question.text}</strong></p>
                        </div>
                        <p className={classes.Incorrect}>Vaš odgovor: <strong>{this.state.ans}</strong></p>
                        <p className={classes.Link}>Pronađite tačan odgovor na linku:<br /><a target="_blank" href={this.state.question.link} rel="noopener noreferrer">{this.state.question.link}</a></p>
                        <div style={{ border: 'none' }} className={classes.Button}>
                            <Button clicked={this.closeModalHandler} text="Zatvori" />
                        </div>
                        <div style={{ border: 'none' }} className={[classes.Button, classes.Danger].join(' ')}>
                            <Button clicked={this.reportModeHandler} text="Prijavi nepravilnost" />
                        </div>
                    </div>
                );
            } else {
                modalDetails = (
                    <div className={classes.ModalInfo}>
                        <p>Popunite polja i pošaljite nepravilnost koju ste uočili</p>
                        <p style={{ margin: '10px 0 0 0' }}>Na pitanje: </p>
                        <div>
                            <p style={{ textAlign: 'justify', margin: '10px' }}><strong>{this.state.question.text}</strong></p>
                        </div>
                        <p className={classes.Incorrect}>Vaš odgovor: <strong>{this.state.ans}</strong></p>
                        <div style={{ border: 'none' }}>
                            <p style={{ fontSize: 'medium', fontWeight: 'bold', marginBottom: '0' }}>Unesite poruku</p>
                            <p style={{ fontSize: 'small', fontWeight: 'bold', color: 'red', margin: '0' }}>{this.state.errorMessage}</p>
                            <textarea style={{ width: '100%' }} onChange={(event) => this.setState({ reportMessage: event.target.value })} placeholder="Ovde napišite vašu primedbu na ovo pitanje a zatim pritisnite dugme &quot;Prijavi&quot;. Tekst mora biti minimum 10 a maksimum 200 karaktera." />
                        </div>
                        <div style={{ border: 'none' }} className={[classes.Button, classes.Danger].join(' ')}>
                            <Button clicked={this.report} text="Prijavi" />
                        </div>
                        <div style={{ border: 'none' }} className={classes.Button}>
                            <button onClick={this.reportModeHandler}>Odustani</button>
                        </div>
                    </div>
                )
            }
        }

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <Modal show={this.state.incorrect} modalClosed={this.closeModalHandler}>
                            {modalDetails}
                        </Modal>
                        <div className={classes.Quiz}>
                            {quizDetails}
                            {questionText}
                            {timerText}
                            {answers}
                            {gameover}
                            {points}
                            {currentScore}
                            {timer}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, null)(Quiz);