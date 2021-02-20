import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { useMutation } from 'react-query';
import { editQuestion, addQuestion, deleteQuestion } from '../../services/questions';
import Loader from '../../components/Spinner';

const EditQuestion = (props) => {
  const history = useHistory();
  const question = props.location.state;
  const isNew = props.location.state.isNew;
  const [state, setState] = useState({
    id: question._id,
    answer1: question.answer1 || '',
    answer2: question.answer2 || '',
    answer3: question.answer3 || '',
    correct: question.correct || '',
    text: question.text || '',
    link: question.link || '',
    points: question.points || 10,
  });

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [addNewQuestion, { isLoading: isCreating }] = useMutation(() => addQuestion(state), {
    onSuccess: (data) => {
      if (data.error) {
        alert(`Greška: ${data.error}`);
      } else {
        alert('Uspješno');
        history.push('/admin/questions');
      }
    },
    onError: () => {
      alert('Greška');
    },
  });

  const [updateQuestion, { isLoading: isUpdating }] = useMutation(() => editQuestion(state), {
    onSuccess: (data) => {
      if (data.error) {
        alert(`Greška: ${data.error}`);
      } else {
        alert('Uspješno');
        history.push('/admin/questions');
      }
    },
    onError: () => {
      alert('Greška');
    },
  });

  const [deleteThisQuestion, { isLoading: isDeleting }] = useMutation(() => deleteQuestion(state.id), {
    onSuccess: (data) => {
      if (data.error) {
        alert(`Greška: ${data.error}`);
      } else {
        alert('Uspješno');
        history.push('/admin/questions');
      }
    },
    onError: () => {
      alert('Greška');
    },
  });

  return (
    <div className="wrapper">
      {isCreating || isUpdating || isDeleting ? (
        <Loader />
      ) : (
        <div className="question-wrapper">
          <div className="question__edit">
            <label htmlFor="text">Pitanje:</label>
            <input id="text" name="text" value={state.text} onChange={onChangeHandler} />
            <label htmlFor="correct">Tačan odgovor:</label>
            <input id="correct" name="correct" value={state.correct} onChange={onChangeHandler} />
            <label htmlFor="answer1">Netačan odgovor 1:</label>
            <input id="answer1" name="answer1" value={state.answer1} onChange={onChangeHandler} />
            <label htmlFor="answer2">Netačan odgovor 2:</label>
            <input id="answer2" name="answer2" value={state.answer2} onChange={onChangeHandler} />
            <label htmlFor="answer3">Netačan odgovor 3:</label>
            <input id="answer3" name="answer3" value={state.answer3} onChange={onChangeHandler} />
            <label htmlFor="points">Bodovi:</label>
            <select id="points" name="points" value={state.points} onChange={onChangeHandler}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <label htmlFor="link">Link:</label>
            <input id="link" name="link" value={state.link} onChange={onChangeHandler} />
            <div className="mt-4">
              <Button
                type="submit"
                onClick={() => {
                  setState({ ...state, points: +state.points });
                  if (isNew) {
                    addNewQuestion();
                  } else {
                    updateQuestion();
                  }
                }}
              >
                Potvrdi
              </Button>
              {state.id ? (
                <Button
                  type="classic"
                  className="active ml-1"
                  onClick={() => {
                    deleteThisQuestion();
                  }}
                >
                  Izbriši
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditQuestion;
