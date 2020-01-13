import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import classes from './Ranking.module.css';
import icon0 from '../../images/0.png';
import icon1 from '../../images/1.png';
import icon2 from '../../images/2.png';
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

        loading: false
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
                this.setState({ currentScore: res.data.score })
            })
    }

    getMyBest = () => {
        const userId = this.props.user.userId;
        axios.get(`/thebestscore/${userId}`)
            .then(result => {
                this.setState({ theBestScore: result.data.score })
            })
    }

    getMyScoreOfLastMonth = () => {
        const userId = this.props.user.userId;
        axios.get(`/scorelastmonth/${userId}`)
            .then(result => {
                this.setState({ scoreOfTheLastMonth: result.data.score });
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

    closeModalHandler = () => {
        this.setState({ showLastMonth: false, showTheBest: false });
    }


    render() {
        let list, loading, loadingModal;
        const icons = [icon0, icon1, icon2];
        const date = new Date();
        let thisMonth = new Date(date.getFullYear(), date.getMonth());
        thisMonth = thisMonth.toString();
        let month, year;
        month = thisMonth.split(' ')[1];
        year = thisMonth.split(' ')[3]
        let modalDetails;

        if (this.state.loading && !this.state.showLastMonth && !this.state.showTheBest) {
            loading = <Spinner />;
            list = null;
        } else if (this.state.loading && (this.state.showLastMonth || this.state.showTheBest)) {
            loadingModal = <Spinner />
        } else {
            loadingModal = null;
        }


        if (this.state.top10) {
            if (this.state.top10.length > 0) {
                list = this.state.top10.map((player, i) => {
                    let userProfile = `/korisnik/${player.userId}`;
                    if (i < 3) {
                        return (
                            <li key={i}><img src={icons[i]} alt="medal" style={{ width: '20px' }} /> {i + 1}. {player.fullName} - {player.score} bodova{this.props.isAdmin ? <Link style={{ fontSize: 'small', color: 'red' }} to={userProfile}> --- Vidi profil</Link> : ''}</li>
                        )
                    } else {
                        return (
                            <li key={i}> {i + 1}. {player.fullName} - {player.score} bodova{this.props.isAdmin ? <Link style={{ fontSize: 'small', color: 'red' }} to={userProfile}> --- Vidi profil</Link> : ''}</li>
                        )
                    }
                })
            } else {
                list = <p>Lista još uvijek ne postoji.</p>;
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
                    if (i < 3) {
                        return (
                            <li key={i}><img src={icons[i]} alt="medal" style={{ width: '20px' }} /> {i + 1}. {player.fullName} - {player.score} bodova{this.props.isAdmin ? <Link style={{ fontSize: 'small', color: 'red' }} to={userProfile}> --- Vidi profil</Link> : ''}</li>
                        )
                    } else {
                        return (
                            <li key={i}> {i + 1}. {player.fullName} - {player.score} bodova{this.props.isAdmin ? <Link style={{ fontSize: 'small', color: 'red' }} to={userProfile}> --- Vidi profil</Link> : ''}</li>
                        )
                    }
                });
            } else {
                list = <p>Lista još uvijek ne postoji.</p>;
            }
            modalDetails = (
                <div className={classes.List}>
                    {title}
                    <ul>
                        {loadingModal}
                        {list}
                    </ul>
                    <Button clicked={this.closeModalHandler} text="Zatvori" />
                </div>
            )
        }

        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <div className={classes.Ranking}>
                            <Modal show={this.state.showLastMonth || this.state.showTheBest} modalClosed={this.closeModalHandler}>
                                {modalDetails}
                            </Modal>
                            <p style={{ fontSize: 'medium', fontWeight: 'bold', color: 'rgb(102,149,204)', margin: '0' }}>Rang lista</p>
                            <p style={{ fontSize: '11px', color: 'rgb(5, 130, 202)', fontWeight: 'bold' }}>{month} {year}</p>
                            <div className={classes.List} style={{height: '200px'}}>
                                <ul style={{height: '200px'}}>
                                    {loading}
                                    {list}
                                </ul>
                            </div>
                            <div className={classes.List}>
                                <ul>
                                    <li>Moj najbolji rezultat ovog mjeseca: {this.state.currentScore}</li>
                                    <li>Moj najbolji rezultat prošlog mjeseca: {this.state.scoreOfTheLastMonth}</li>
                                    <li>Moj najbolji rezultat do sad: {this.state.theBestScore}</li>
                                </ul>
                            </div>
                            <Button clicked={this.listOfTop10} text="Najbolji rezultati" />
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