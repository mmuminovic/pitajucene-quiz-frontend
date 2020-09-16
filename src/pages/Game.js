import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import Question from '../components/Question'
import Answer from '../components/Answer'
import { startQuiz, submitAnswer } from '../services/quiz'
import { Spinner } from 'reactstrap'

export default function Game(props) {
    const [selected, select] = useState(0)
    const [started, start] = useState(false)
    const [quiz, setQuiz] = useState('')
    const [question, setQuestion] = useState({
        text: '',
        answers: [],
    })

    const [startGame, starting] = useMutation(() => startQuiz(), {
        onSuccess: (data) => {
            setQuiz(data.quiz)
            setQuestion(data.question)
        },
        onError: () => {},
    })

    const [sendAnswer, sendingAnswer] = useMutation(
        () => submitAnswer(quiz, question.answers[selected - 1]),
        {
            onSuccess: () => {},
            onError: () => {},
        }
    )

    useEffect(() => {
        startGame()
    }, [startGame])

    return (
        <div className="wrapper">
            {starting.status === 'loading' ? (
                <Spinner />
            ) : (
                <div className="game">
                    <Question num={question.num} question={question.text} />
                    <div className="game-answers">
                        {question.answers.map((ans, i) => (
                            <Answer
                                text={ans}
                                onClickHandler={() => {
                                    select(i + 1)
                                    return sendAnswer()
                                }}
                                isSelected={selected === i + 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
