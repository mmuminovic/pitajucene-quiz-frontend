import React, { Component } from 'react';
import classes from './Questions.module.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';

class Questions extends Component {

    state = {
        questions: null,
        points: 0,
        numberOfQuestions: 0,
        sortBy: 'createdAt',
        willUpdate: false,
        loading: true,
        showModal: false,
        questionId: null,
        questionText: null
    }

    componentDidMount() {
        this.getAllQuestions(this.state.sortBy);
    }

    getQuestionsByPoints = (p, sortBy) => {
        axios.post('/get-by-condition', { condition: { points: p }, sortBy: sortBy })
            .then(q => {
                let loadedQuestions = q.data;
                this.setState({ questions: loadedQuestions, numberOfQuestions: loadedQuestions.length, willUpdate: false, loading: false });
            })
    }

    getAllQuestions = (sortBy) => {
        axios.post('/get-by-condition', { condition: {}, sortBy: sortBy })
            .then(q => {
                let loadedQuestions = q.data;
                this.setState({ questions: loadedQuestions, numberOfQuestions: loadedQuestions.length, willUpdate: false, loading: false });
            });
    }

    onChangeHandler = (event) => {
        const points = parseInt(event.target.value);
        this.setState({ points: points, loading: true });
        if (points === 0) {
            this.getAllQuestions(this.state.sortBy)
        } else {
            this.getQuestionsByPoints(points, this.state.sortBy);
        }
    }

    sortQuestions = (event) => {
        const sortBy = event.target.value;
        this.setState({ sortBy: sortBy, loading: true });
        if (this.state.points === 0) {
            this.getAllQuestions(sortBy)
        } else {
            this.getQuestionsByPoints(this.state.points, event.target.value);
        }
    }

    editHandler = (questionId) => {
        this.props.history.push(`/input/${questionId}`);
    }

    deleteHandler = (id, p, text) => {
        this.setState({ showModal: true, questionId: id, points: p, questionText: text });
    }

    deleteQuestion = () => {
        axios.delete(`/delete/${this.state.questionId}`)
            .then(res => {
                this.setState({ showModal: false });
                if (this.state.points === 0) {
                    this.getAllQuestions();
                } else {
                    this.getQuestionsByPoints(this.state.points);
                }
            });
    }

    closeModalHandler = () => {
        this.setState({ showModal: false, questionId: null, questionText: null, loading: false })
    }

    render() {
        let list, loading, modalDetails;

        if (this.state.showModal) {
            modalDetails = (
                <div className={classes.ModalInfo}>
                    <p style={{ fontWeight: 'bold', fontSize: 'medium' }}>Da li ste sigurni da želite da izbrišete pitanje:</p>
                    <p style={{ fontWeight: '500', fontSize: 'small' }}>{this.state.questionText}</p>
                    <button className={classes.Danger} onClick={this.deleteQuestion}>Da</button>
                    <button className={classes.Button} onClick={this.closeModalHandler}>Ne</button>
                </div>
            )
        }

        if (this.state.loading) {
            loading = <Spinner />
        }

        if (this.state.questions) {
            list = this.state.questions.map(q => {
                return (
                    <li key={q._id}><span style={{ float: 'left', padding: '5px' }}>{q.text}</span><span><button className={[classes.Danger, classes.ListButton].join(' ')} onClick={() => this.deleteHandler(q._id, q.points, q.text)}>izbriši</button><button className={[classes.Button, classes.ListButton].join(' ')} onClick={() => this.editHandler(q._id)}>Izmijeni</button><span style={{ color: 'red', padding: '5px', margin: '0 5px' }}>{q.answeredIncorrectly}</span><span style={{ color: 'green', padding: '5px', margin: '0 5px' }}>{q.answeredCorrectly}</span></span></li>
                );
            })
        }

        return (
            <div className={classes.ListOfQuestions}>
                <p style={{ fontWeight: '500', fontSize: 'medium' }}>Pretraži pitanja po kriterijumima</p>
                <select onChange={(event) => this.onChangeHandler(event)}>
                    <option value={0}>Sva pitanja</option>
                    <option value={10}>10 - Laka pitanja</option>
                    <option value={15}>15 - Srednji nivo</option>
                    <option value={20}>20 - Teška pitanja</option>
                </select>
                <select onChange={(event) => this.sortQuestions(event)}>
                    <option value={'createdAt'}>Po datumu izmjene - najskorije izmjene prvo</option>
                    <option value={'answeredCorrectly'}>Najviše tačnih odgovora</option>
                    <option value={'answeredIncorrectly'}>Najviše netačnih odgovora</option>
                </select>
                <p>Broj pitanja u ovoj kategoriji: {this.state.numberOfQuestions}</p>
                <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
                    {modalDetails}
                </Modal>
                <button className={[classes.Button, classes.ListButton].join(' ')} onClick={() => { this.props.history.push('/input') }}>Dodaj pitanje</button>
                {loading}
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default Questions;