import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import Question from '../components/Question'
import Answer from '../components/Answer'
import ErrorMessage from '../components/ErrorMessage'
import { startQuiz, submitAnswer } from '../services/quiz'
import Loader from '../components/Spinner'
import CongratsMessage from '../components/CongratsMessage'
import { TimeProgress } from '../containers/TimeProgress'
import ScoreProgress from '../containers/ScoreProgress'
import TimeIsUpMessage from '../components/TimeIsUpMessage'

const Game = () => {
    const history = useHistory()
    const [selected, select] = useState(0)
    const [quiz, setQuiz] = useState('')
    const [correctAns, setCorrectAns] = useState('')
    const [gameover, setGameover] = useState(false)
    const [isNotActive, setIsNotActive] = useState(false)
    const [score, setScore] = useState(0)
    const [question, setQuestion] = useState({
        text: '',
        answers: [],
        num: 0,
    })

    const [
        startGame,
        { isSuccess: startedSuccessfully, isError: startingError },
    ] = useMutation(() => startQuiz(), {
        onSuccess: (data) => {
            setQuiz(data.quiz)
            setQuestion(data.question)
        },
    })

    const [sendAnswer] = useMutation(
        (selectedAns) => submitAnswer(quiz, question.answers[selectedAns - 1]),
        {
            onSuccess: (res) => {
                const { data } = res
                setScore(data.score)
                const changeQuestion = () =>
                    setTimeout(() => {
                        setCorrectAns('')
                        select(0)
                        if (data.active === false) {
                            setIsNotActive(true)
                        } else if (!data.gameover) {
                            setQuestion(data.question)
                        } else {
                            setGameover(true)
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
                <Loader />
            ) : startingError ? (
                <ErrorMessage />
            ) : isNotActive ? (
                <TimeIsUpMessage />
            ) : gameover ? (
                <CongratsMessage onClick={() => history.replace('/')} />
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
                    <ScoreProgress score={score} />
                    <TimeProgress />
                </div>
            )}
        </div>
    )
}

export default Game
