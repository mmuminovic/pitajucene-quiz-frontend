import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Edit, Check, Cancel } from '@material-ui/icons';
import { useQuery } from 'react-query';
import { getQuestions } from '../../services/questions';
import Button from '../../components/Button';

const AdminQuestions = () => {
  const history = useHistory();
  const { data: questions = [] } = useQuery('getQuestions', () => getQuestions());
  return (
    <div className="wrapper">
      <div>
        <div className="ml-4">
          <Button type="submit" onClick={() => history.push('/admin/questions/edit', { isNew: true })}>
            Dodaj novo pitanje
          </Button>
        </div>
        <div className="question-wrapper">
          <Table dark striped>
            <thead>
              <tr className="question-table__header">
                <td>Pitanje</td>
                <td>
                  <Check htmlColor="#4caf50" />
                </td>
                <td>
                  <Cancel htmlColor="#e9585e" />
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody className="question-table__body">
              {questions.map((question, index) => {
                return (
                  <tr key={index}>
                    <td className="question-list-item__text">{question.text}</td>
                    <td className="question-list-item__number--correct">{question.answeredCorrectly}</td>
                    <td className="question-list-item__number--incorrect">{question.answeredIncorrectly}</td>
                    <td onClick={() => history.push('/admin/questions/edit', { ...question })}>
                      <Edit htmlColor="#fff" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestions;
