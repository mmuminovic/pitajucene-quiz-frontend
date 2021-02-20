import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Edit, Check, Cancel } from '@material-ui/icons';
import { useQuery } from 'react-query';
import { getQuestions } from '../../services/questions';
import Button from '../../components/Button';

const AdminQuestions = () => {
  const history = useHistory();
  const [sortBy, setSortBy] = useState('answeredCorrectly');
  const { data: questions = [], refetch } = useQuery('getQuestions', () => getQuestions({ sortBy }), {
    refetchOnMount: true,
  });

  const onChangeSortHandler = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [sortBy, refetch]);

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
              <tr>
                <div className="question__edit mt-2 mb-2">
                  <select id="points" name="points" value={sortBy} onChange={onChangeSortHandler}>
                    <option value={'answeredCorrectly'}>Po broju tačnih odgovora</option>
                    <option value={'answeredIncorrectly'}>Po broju netačnih odgovora</option>
                  </select>
                </div>
              </tr>
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
