import React, { Component } from 'react';
import classes from './Users.module.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';

class Questions extends Component {

    state = {
        users: null,
        numberOfusers: 0,
        loading: false,
        quizPlayed: null,
        activeUsers: true,
        showModal: false,
        userId: null,
        user: null
    }

    componentDidMount() {
        this.getActiveUsers()
    }

    getActiveUsers = () => {
        this.setState({ loading: true });
        axios.get('/get-users')
            .then(users => {
                let loadedUsers = users.data;
                this.setState({ users: loadedUsers.ranking, numberOfusers: loadedUsers.ranking.length, quizPlayed: loadedUsers.quizPlayed, loading: false });
            });
    }

    getAllUsers = () => {
        this.setState({ loading: true });
        axios.get('/users')
            .then(users => {
                let loadedUsers = users.data;
                this.setState({ users: loadedUsers, numberOfusers: loadedUsers.length, loading: false });
            })
    }

    choose = (event) => {
        const index = parseInt(event.target.value);
        if (index === 0) {
            this.getActiveUsers();
        } else {
            this.getAllUsers();
        }
    }

    editHandler = (userid) => {
        this.props.history.push(`/korisnik/${userid}`);
    }

    deleteHandler = (id, userName) => {
        this.setState({ userId: id, user: userName, showModal: true })
    }

    deleteUser = () => {
        this.setState({ loading: true });
        const p1 = axios.delete(`/user/${this.state.userId}`)
            .then(res => {
                if (this.state.activeUsers) {
                    this.getActiveUsers();
                } else {
                    this.getAllUsers();
                }
            });

        const p2 = axios.delete(`/quiz/${this.state.userId}`);

        Promise.all([p1, p2]).then(result => {
            this.setState({ userId: null, user: null, showModal: false, loading: false })
        });
    }

    closeModalHandler = () => {
        this.setState({ showModal: false, userId: null, user: null, loading: false });
    }

    render() {
        let list, loading, modalDetails;

        if (this.state.loading) {
            loading = <Spinner />
        }

        if (this.state.showModal) {
            modalDetails = (
                <div className={classes.ModalInfo}>
                    <p style={{ fontWeight: 'bold', fontSize: 'medium' }}>Da li ste sigurni da želite da izbrišete korisnika:</p>
                    <p style={{ fontWeight: '500', fontSize: 'small' }}>{this.state.user}</p>
                    <button className={classes.Danger} onClick={this.deleteUser}>Da</button>
                    <button className={classes.Button} onClick={this.closeModalHandler}>Ne</button>
                </div>
            )
        }

        if (this.state.users) {
            list = this.state.users.map(user => {
                return (
                    <li key={user.userId}><span style={{ float: 'left', padding: '5px' }}>{user.fullName}</span><span><button className={[classes.Danger, classes.ListButton].join(' ')} onClick={() => this.deleteHandler(user.userId, user.fullName)}>Izbriši</button><button className={[classes.Button, classes.ListButton].join(' ')} onClick={() => this.editHandler(user.userId)}>Vidi profil</button>{user.numOfGames ? <span style={{ color: 'blue', padding: '5px' }}>Igrao: {user.numOfGames} puta</span> : ''}</span></li>
                );
            })
        }

        return (
            <div className={classes.ListOfUsers}>
                <p style={{ fontWeight: '500', fontSize: 'medium' }}>Svi korisnici</p>
                <p>Broj korisnika: {this.state.numberOfusers}</p>
                <p>Kviz pokrenut ukupno {this.state.quizPlayed} puta.</p>
                <select onChange={(event) => this.choose(event)}>
                    <option value={0}>Aktivni korisnici</option>
                    <option value={1}>Svi korisnici</option>
                </select>
                {loading}
                <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
                    {modalDetails}
                </Modal>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default Questions;