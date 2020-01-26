import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import classes from './Ranking.module.css';
import icon0 from '../../images/0.png';
import userIcon from '../../images/user.png';
import timeIcon from '../../images/clock.png';
import star from '../../images/star.png';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

class Ranking extends Component {

    state = {
        top10: null,

        theBestScore: null,
        scoreOfTheLastMonth: null,
        currentScore: null,

        theBestOfLastMonth: [],
        top10playersEver: [],
        showLastMonth: false,
        showTheBest: false,

        loading: false,
        myResults: false
    }

    componentDidMount() {
        this.getRanking();
        this.getMyScore();
        this.getMyScoreOfLastMonth();
        this.getMyBest();
    }

    getRanking = () => {
        this.setState({ loading: true });
        axios.get('/ranking-list')
            .then(top10 => {
                const top10players = top10.data;
                this.setState({ top10: top10players, loading: false });
            })
    }

    getRankingLastMonth = () => {
        this.setState({ loading: true });
        axios.get('/ranking-list/lastMonth')
            .then(result => {
                const theBestOfLastMonthData = result.data;
                this.setState({ theBestOfLastMonth: theBestOfLastMonthData, loading: false });
            })
    }

    top10 = () => {
        this.setState({ loading: true });
        axios.get('/ranking-list/theBestPlayers')
            .then(result => {
                this.setState({ top10playersEver: result.data, loading: false });
            })
    }

    getMyScore = () => {
        const userId = this.props.user.userId;
        axios.get(`/myscore/${userId}`)
            .then(res => {
                this.setState({ currentScore: res.data })
            })
    }

    getMyBest = () => {
        const userId = this.props.user.userId;
        axios.get(`/thebestscore/${userId}`)
            .then(result => {
                this.setState({ theBestScore: result.data })
            })
    }

    getMyScoreOfLastMonth = () => {
        const userId = this.props.user.userId;
        axios.get(`/scorelastmonth/${userId}`)
            .then(result => {
                this.setState({ scoreOfTheLastMonth: result.data });
            })
    }


    listOfTop10 = () => {
        this.top10();
        this.setState({ showTheBest: true });
    }

    listOfLastMonth = () => {
        this.getRankingLastMonth();
        this.setState({ showLastMonth: true });
    }

    showMyResults = () => {
        this.setState({ myResults: true });
    }

    closeModalHandler = () => {
        this.setState({ showLastMonth: false, showTheBest: false, myResults: false });
    }


    render() {
        let list, loading, loadingModal;
        const date = new Date();
        let thisMonth = new Date(date.getFullYear(), date.getMonth());
        thisMonth = thisMonth.toString();
        let month, year;
        month = thisMonth.split(' ')[1];
        year = thisMonth.split(' ')[3]
        let modalDetails;

        if (this.state.loading && !this.state.showLastMonth && !this.state.showTheBest) {
            loading = (<tr>
                <td colSpan="4"><Spinner /></td>
            </tr>);
            list = null;
        } else if (this.state.loading && (this.state.showLastMonth || this.state.showTheBest)) {
            loadingModal = (<tr>
                <td colSpan="4"><Spinner /></td>
            </tr>);
        } else {
            loadingModal = null;
        }


        if (this.state.top10) {
            if (this.state.top10.length > 0) {
                list = this.state.top10.map((player, i) => {
                    let userProfile = `/korisnik/${player.userId}`;
                    return (
                        <tr key={i}>
                            <td>{i + 1}.</td>
                            <td>{this.props.isAdmin ? <Link style={{ fontSize: 'small', color: 'red' }} to={userProfile}> {player.fullName}</Link> : player.fullName}</td>
                            <td>{player.score}</td>
                            <td>{player.duration}</td>
                        </tr>
                    )
                })
            } else {
                list = <tr>
                    <td colSpan="4">Još niko nije igrao kviz ovog mjeseca</td>
                </tr>;
            }
        }

        if (this.state.showLastMonth || this.state.showTheBest) {
            let listOfWinners;
            let title;
            if (this.state.showLastMonth) {
                listOfWinners = this.state.theBestOfLastMonth;
                title = <p>Top 10 najboljih rezultata prošlog mjeseca</p>
            } else if (this.state.showTheBest) {
                listOfWinners = this.state.top10playersEver;
                title = <p>Top 10 najboljih rezultata do sad</p>
            }
            let list;
            if (listOfWinners.length > 0) {
                list = listOfWinners.map((player, i) => {
                    let userProfile = `/korisnik/${player.userId}`;
                    return (
                        <tr key={i}>
                            <td>{i + 1}.</td>
                            <td>{this.props.isAdmin ? <Link style={{ fontSize: 'small', color: 'red' }} to={userProfile}> {player.fullName}</Link> : player.fullName}</td>
                            <td>{player.score}</td>
                            <td>{player.duration}</td>
                        </tr>
                    )
                });
            } else {
                list = <tr>
                    <td colSpan="4">Lista još uvijek ne postoji.</td>
                </tr>;
            }
            modalDetails = (
                <div className={classes.List}>
                    {title}
                    <table className={classes.Table}>
                        <thead>
                            <tr>
                                <th><img src={icon0} alt="medal" style={{ width: '20px' }} /></th>
                                <th><img src={userIcon} alt="medal" style={{ width: '20px' }} /></th>
                                <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                                <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingModal}
                            {list}
                        </tbody>
                    </table>
                    <Button clicked={this.closeModalHandler} text="Zatvori" />
                </div>
            )
        }

        let myResults;

        if (this.state.currentScore && this.state.theBestScore && this.state.scoreOfTheLastMonth) {
            myResults = (<tr>
                <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                <td>{this.state.currentScore.score}</td>
                <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                <td>{this.state.currentScore.duration}</td>
                <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                <td>{this.state.scoreOfTheLastMonth.score}</td>
                <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                <td>{this.state.scoreOfTheLastMonth.duration}</td>
                <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                <td>{this.state.theBestScore.score}</td>
                <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                <td>{this.state.theBestScore.duration}</td>
            </tr>);
            if (this.state.myResults) {
                modalDetails = (
                    <div>
                        <table className={classes.Table} style={{ width: '80%' }}>
                            <thead>
                                <tr>
                                    <th colSpan="12">Moji najbolji rezultati</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4" style={{ backgroundColor: '#4CAF50', fontWeight: '500', color: 'white' }}>Ovog mjeseca:</td>
                                </tr>
                                <tr>
                                    <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                                    <td>{this.state.currentScore.score}</td>
                                    <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                                    <td>{this.state.currentScore.duration}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ backgroundColor: '#4CAF50', fontWeight: '500', color: 'white' }}>Prošlog mjeseca:</td>
                                </tr>
                                <tr>
                                    <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                                    <td>{this.state.scoreOfTheLastMonth.score}</td>
                                    <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                                    <td>{this.state.scoreOfTheLastMonth.duration}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" style={{ backgroundColor: '#4CAF50', fontWeight: '500', color: 'white' }}>Najbolji rezultat ikad:</td>
                                </tr>
                                <tr>
                                    <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                                    <td>{this.state.theBestScore.score}</td>
                                    <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                                    <td>{this.state.theBestScore.duration}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Button clicked={this.closeModalHandler} text="Zatvori" />
                    </div>
                )
            }
        }

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <div className={classes.Ranking}>
                            <Modal show={this.state.showLastMonth || this.state.showTheBest || this.state.myResults} modalClosed={this.closeModalHandler}>
                                {modalDetails}
                            </Modal>
                            <p style={{ fontSize: 'medium', fontWeight: 'bold', color: 'rgb(102,149,204)', margin: '0' }}>Rang lista</p>
                            <p style={{ fontSize: '11px', color: 'rgb(5, 130, 202)', fontWeight: 'bold' }}>{month} {year}</p>
                            <div className={classes.List} style={{ maxHeight: '300px' }}>
                                <table className={classes.Table}>
                                    <thead>
                                        <tr>
                                            <th><img src={icon0} alt="medal" style={{ width: '20px' }} /></th>
                                            <th><img src={userIcon} alt="medal" style={{ width: '20px' }} /></th>
                                            <th><img src={star} alt="medal" style={{ width: '20px' }} /></th>
                                            <th><img src={timeIcon} alt="medal" style={{ width: '20px' }} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading}
                                        {list}
                                    </tbody>
                                </table>
                            </div>
                            <div className={classes.MyResults}>
                                <table className={classes.Table} style={{ width: '80%' }}>
                                    <thead>
                                        <tr>
                                            <th colSpan="12">Moji najbolji rezultati</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="4" style={{ width: '33%' }}>Ovog mjeseca:</td>
                                            <td colSpan="4" style={{ width: '34%' }}>Prošlog mjeseca:</td>
                                            <td colSpan="4" style={{ width: '33%' }}>Najbolji rezultat ikad:</td>
                                        </tr>
                                        {myResults}
                                    </tbody>
                                </table>
                            </div>
                            <div className={classes.MyResultsButton}>
                                <Button clicked={this.showMyResults} text="Moji najbolji rezultati" />
                            </div>
                            <Button clicked={this.listOfTop10} text="Rang lista najboljih ikad" />
                            <Button clicked={this.listOfLastMonth} text="Rang lista prošlog mjeseca" />
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

export default connect(mapStateToProps, null)(Ranking);