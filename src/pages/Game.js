import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import Question from '../components/Question'
import Answer from '../components/Answer'
import ErrorMessage from '../components/ErrorMessage'
import { startQuiz, submitAnswer } from '../services/quiz'
import { Spinner } from 'reactstrap'

const Game = () => {
    const [selected, select] = useState(0)
    const [quiz, setQuiz] = useState('')
    const [correctAns, setCorrectAns] = useState('')
    const [question, setQuestion] = useState({
        text: '',
        answers: [],
        num: 0,
    })

    const history = useHistory()

    const [
        startGame,
        { isSuccess: startedSuccessfully, isError: startingError },
    ] = useMutation(() => startQuiz(), {
        onSuccess: (data) => {
            setQuiz(data.quiz)
            setQuestion(data.question)
        },
        onError: () => {},
    })

    const [sendAnswer, { isLoading }] = useMutation(
        (selectedAns) => submitAnswer(quiz, question.answers[selectedAns - 1]),
        {
            onSuccess: (res) => {
                const { data } = res

                const changeQuestion = () =>
                    setTimeout(() => {
                        setCorrectAns('')
                        select(0)
                        if (!data.gameover) {
                            setQuestion(data.question)
                        } else {
                            history.push('/')
                        }
                    }, 1800)

                setTimeout(() => {
                    setCorrectAns(data.correct)
                    changeQuestion()
                }, 200)
            },
            onError: () => {},
        }
    )

    useEffect(() => {
        startGame()
    }, [startGame])

    return (
        <div className="wrapper">
            {!startedSuccessfully ? (
                <Spinner
                    type="grow"
                    style={{ color: '#fff', width: '100px', height: '100px' }}
                />
            ) : startingError ? (
                <ErrorMessage />
            ) : (
                <div className="game">
                    <Question num={question.num + 1} question={question.text} />
                    <div className="game-answers">
                        {question.answers.map((ans, i) => (
                            <Answer
                                key={i}
                                text={ans}
                                correct={correctAns}
                                onClickHandler={() => {
                                    select(i + 1)
                                    return sendAnswer(i + 1)
                                }}
                                isSelected={selected === i + 1}
                                answered={selected > 0}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Game
