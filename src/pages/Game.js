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
    const [started, start] = useState(false)
    const [quiz, setQuiz] = useState('')
    const [incorrect, setIncorrect] = useState(false)
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
                        setIncorrect(false)
                        setCorrectAns('')
                        select(0)
                        if (!data.gameover) {
                            setQuestion(data.question)
                        } else {
                            history.push('/')
                        }
                    }, 1000)

                setTimeout(() => {
                    setIncorrect(data.incorrect)
                    setCorrectAns(data.correct)
                    changeQuestion()
                }, 400)
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
                <Spinner />
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
