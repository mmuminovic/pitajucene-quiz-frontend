import React, { Component } from 'react';
import classes from './Quotes.module.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';

class Quotes extends Component {

    state = {
        quotes: null,
        numberOfQuotes: 0,
        loading: true,
        showModal: false,
        addQuote: false,
        editQuote: false,
        quoteId: null,
        quoteText: '',
        quoteSource: '',
        quoteAuthor: ''
    }

    componentDidMount() {
        this.getAllQuotes();
    }

    getAllQuotes = () => {
        axios.get('/quotes/get-all-quotes')
            .then(q => {
                console.log(q);
                let loadedQuotes = q.data;
                this.setState({ quotes: loadedQuotes, loading: false });
            });
    }

    addQuote = () => {
        this.setState({ showModal: true, addQuote: true, editQuote: false });
    }

    editQuote = (q) => {
        this.setState({
            quoteId: q.quoteId,
            quoteText: q.quoteText,
            quoteSource: q.quoteSource,
            quoteAuthor: q.quoteAuthor,
            showModal: true,
            editQuote: true,
            addQuote: false
        })
        console.log(q);
    }

    submitQuote = () => {
        let newQuote = {
            quoteText: this.state.quoteText,
            quoteSource: this.state.quoteSource,
            quoteAuthor: this.state.quoteAuthor
        }
        if (this.state.addQuote && !this.state.editQuote) {
            axios.post('/quotes/add-quote', newQuote)
                .then(result => {
                    this.closeModalHandler();
                    this.getAllQuotes();
                })
        } else if (this.state.editQuote && !this.state.addQuote) {
            axios.patch(`/quotes/edit/${this.state.quoteId}`, newQuote)
                .then(result => {
                    this.closeModalHandler();
                    this.getAllQuotes();
                })
        }
    }
    deleteHandler = (id, text) => {
        this.setState({
            showModal: true,
            quoteId: id,
            quoteText: text,
        });
    }

    deleteQuestion = () => {
        axios.delete(`/quotes/delete/${this.state.quoteId}`)
            .then(res => {
                this.closeModalHandler();
                this.getAllQuotes();
            });
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false,
            quoteId: null,
            quoteText: '',
            quoteSource: '',
            quoteAuthor: '',
            loading: false,
            editQuote: false,
            addQuote: false
        })
    }

    render() {
        let list, loading, modalDetails;

        if (this.state.showModal && !this.state.addQuote && !this.state.editQuote) {
            modalDetails = (
                <div className={classes.ModalInfo}>
                    <p style={{ fontWeight: 'bold', fontSize: 'medium' }}>Da li ste sigurni da želite da izbrišete citat:</p>
                    <p style={{ fontWeight: '500', fontSize: 'small' }}>{this.state.quoteText}</p>
                    <button className={classes.Danger} onClick={this.deleteQuestion}>Da</button>
                    <button className={classes.Button} onClick={this.closeModalHandler}>Ne</button>
                </div>
            )
        } else {
            modalDetails = (
                <div className={classes.Input}>
                    <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Dodavanje/izmjena citata</p>
                    <div>
                        <p>Citat</p>
                        <textarea value={this.state.quoteText} onChange={(event) => this.setState({ quoteText: event.target.value })} placeholder="Unesite citat" />
                    </div>
                    <div>
                        <p>Izvor</p>
                        <input value={this.state.quoteSource} onChange={(event) => this.setState({ quoteSource: event.target.value })} placeholder="Unesite izvor" />
                    </div>
                    <div>
                        <p>Autor</p>
                        <input value={this.state.quoteAuthor} onChange={(event) => this.setState({ quoteAuthor: event.target.value })} placeholder="Unesite autora" />
                    </div>
                    <button className={[classes.Button, classes.ListButton].join(' ')} style={{ marginTop: '10px' }} onClick={this.submitQuote}>Potvrdi</button>
                </div>
            )
        }

        if (this.state.loading) {
            loading = <Spinner />
        }

        if (this.state.quotes) {
            list = this.state.quotes.map(q => {
                return (
                    <li key={q.quoteId}><span style={{ float: 'left', padding: '5px' }}>{q.quoteText}</span><span><button className={[classes.Danger, classes.ListButton].join(' ')} onClick={() => this.deleteHandler(q.quoteId, q.quoteText)}>izbriši</button><button className={[classes.Button, classes.ListButton].join(' ')} onClick={() => this.editQuote(q)}>Izmijeni</button></span></li>
                );
            })
        }

        return (
            <div className={classes.ListOfQuestions}>
                <p style={{ fontWeight: '500', fontSize: 'medium' }}>Citati</p>
                <p>Broj pitanja u ovoj kategoriji: {this.state.quotes ? this.state.quotes.length : null}</p>
                <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
                    {modalDetails}
                </Modal>
                <button className={[classes.Button, classes.ListButton].join(' ')} onClick={this.addQuote}>Dodaj citat</button>
                {loading}
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default Quotes;