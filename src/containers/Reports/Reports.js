import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from './Reports.module.css';
import Spinner from '../Spinner/Spinner';

class Reports extends Component {
    state = {
        reports: null,
        loading: false,
        solved: false
    }

    componentDidMount() {
        this.getReports(this.state.solved);
    }

    getReports = (solved) => {
        this.setState({ loading: true });
        axios.get('/get-reports', { params: { solved: solved } })
            .then(reports => {
                this.setState({ reports: reports.data, loading: false });
            })
    }

    problemSolved = (reportId) => {
        this.setState({ loading: true });
        axios.patch(`/edit-report/${reportId}`)
            .then(result => {
                this.setState({ loading: false });
                this.getReports(false);
            })
    }

    onChangeHandler = (event) => {
        const i = parseInt(event.target.value);
        if (i === 1) {
            this.setState({ solved: true, loading: true });
            this.getReports(true);
        } else {
            this.setState({ solved: false, loading: true });
            this.getReports(false);
        }
        // this.getReports();
    }

    render() {
        let reportsList, select, loading;
        if (this.state.reports) {
            if (this.state.reports.length > 0) {
                let reports = this.state.reports.map((report, i) => {
                    let user = `/korisnik/${report.userId}`;
                    let question = `/input/${report.questionId}`
                    return (<li key={i}>
                        <p>{report.time}</p>
                        <p>Pitanje:</p>
                        <p className={classes.Question}><Link to={question}>{report.questionText}</Link></p>
                        <p>Korisnik: <Link to={user}>{report.fullName}</Link> </p>
                        <p>Korisnikov odgovor: </p>
                        <p style={{ color: 'red', fontWeight: '500' }}>{report.answer}</p>
                        <p>Korisnikova primedba:</p>
                        <p style={{ color: 'red', fontWeight: '500' }}>{report.message}</p>
                        {!this.state.solved ? <button onClick={() => this.problemSolved(report._id)}>Pročitano</button> : null}
                    </li>)
                });
                reportsList = (
                    <ul className={classes.List}>
                        {reports}
                    </ul>
                )
            } else {
                reportsList = <p style={{ color: 'red', fontWeight: 'bold' }}>Trenutno nema prijava.</p>
            }
        }
        if (this.state.loading) {
            reportsList = <Spinner />
        }


        return (
            <div className={classes.ListOfReports}>
                <p style={{ fontWeight: '500', fontSize: 'medium' }}>Pretraži primjedbe po kriterijumima</p>
                <select onChange={(event) => this.onChangeHandler(event)}>
                    <option value={0}>Primjedbe na čekanju</option>
                    <option value={1}>Pročitane primjedbe</option>
                </select>
                <p>Broj pitanja u ovoj kategoriji: {this.state.reports ? this.state.reports.length : '0'}</p>
                {loading}
                <ul>
                    {reportsList}
                </ul>
            </div>
        )
    }
}

export default Reports;