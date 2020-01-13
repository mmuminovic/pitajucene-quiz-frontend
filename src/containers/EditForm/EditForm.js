import React, { Component } from 'react';
import axios from 'axios';
import classes from './EditForm.module.css';
import Button from '../Button/Button';

class EditForm extends Component {

    state = {
        _id: null,
        text: '',
        answer1: '',
        answer2: '',
        answer3: '',
        correct: '',
        link: '',
        points: 0,
        errorMessage: null
    }

    componentDidMount() {
        if (this.props.match.params.questionId) {
            const questionId = this.props.match.params.questionId;
            axios.post('/get-by-condition', { condition: { _id: questionId } })
                .then(q => {
                    const data = q.data[0];
                    this.setState(data);
                })
        }

    }

    addNewQuestion = () => {
        const data = this.state;
        delete data._id;
        delete data.errorMessage;
        axios.post('/add-question', data)
            .then(result => {
                if (result.data.error) {
                    this.setState({ errorMessage: result.data.error })
                } else {
                    this.setState({ errorMessage: null })
                    this.props.history.push('/sva-pitanja');
                }
            });
    }

    editQuestion = () => {
        const data = this.state;
        const questionId = this.state._id;
        delete data._id;
        delete data.errorMessage;
        axios.patch(`/edit-question/${questionId}`, data)
            .then(result => {
                if (result.data.error) {
                    this.setState({ errorMessage: result.data.error })
                } else {
                    this.setState({ errorMessage: null })
                    this.props.history.push('/sva-pitanja');
                }
            })
    }

    submitHandler = () => {
        if (this.state._id) {
            this.editQuestion();
        } else {
            this.addNewQuestion();
        }
    }

    render() {
        return (
            <div className={classes.InputField}>
                <div>
                    <p style={{backgroundColor: 'rgba(188, 188, 248, 0.15)', width: '80%', borderRadius: '10px'}}>Unesite u odgovarajuća polja pitanje, odgovore, link na kome se nalazi odgovor i izaberite broj bodova koje nosi tačan odgovor</p>
                </div>
                <div>
                    <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{this.state.errorMessage}</p>
                </div>
                <div>
                    {/* <p>Tekst pitanja</p> */}
                    <textarea value={this.state.text} onChange={(event) => this.setState({ text: event.target.value })} placeholder="Tekst pitanja" />
                </div>
                <div>
                    {/* <p>Tacan odgovor</p> */}
                    <input value={this.state.correct} onChange={(event) => this.setState({ correct: event.target.value })} placeholder="Tačan odgovor" />
                </div>
                <div>
                    {/* <p>Odgovor 1</p> */}
                    <input value={this.state.answer1} onChange={(event) => this.setState({ answer1: event.target.value })} placeholder="Netačan odgovor 1" />
                </div>
                <div>
                    {/* <p>Odgovor 2</p> */}
                    <input value={this.state.answer2} onChange={(event) => this.setState({ answer2: event.target.value })} placeholder="Netačan odgovor 2" />
                </div>
                <div>
                    {/* <p>Odgovor 3</p> */}
                    <input value={this.state.answer3} onChange={(event) => this.setState({ answer3: event.target.value })} placeholder="Netačan odgovor 3" />
                </div>
                <div>
                    {/* <p>Link za pitanje i odgovor</p> */}
                    <input value={this.state.link} onChange={(event) => this.setState({ link: event.target.value })} placeholder="Link za pitanje i odgovor sa sajta" />
                </div>
                <div>
                    {/* <p>Broj bodova koje nosi tacan odgovor</p> */}
                    <select value={this.state.points} onChange={(event) => this.setState({ points: event.target.value })}>
                        <option disabled value={0} >Broj bodova koje nosi tačan odgovor</option>
                        <option value={5}>5 - Laka pitanja</option>
                        <option value={8}>8 - Srednji nivo</option>
                        <option value={10}>10 - Teška pitanja</option>
                    </select>
                </div>
                <div style={{ borderBottom: '1px solid black', paddingBottom: '15px', width: '60%', margin: '0 auto' }}>
                    <Button clicked={this.submitHandler} text="Sačuvaj" />
                </div>
            </div >
        )
    }
}

export default EditForm;