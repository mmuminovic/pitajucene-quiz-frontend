import React, { useState, useEffect } from 'react'
import { startQuiz, submitAnswer } from '../services/quiz'
import { useMutation } from 'react-query'

import Question from '../components/Question'
import Answer from '../components/Answer'

const Multiplayer = () => {
    const [correctAns, setCorrectAns] = useState('')
    const [selected, select] = useState(0)
    const [score, setScore] = useState(0)
    const [quiz, setQuiz] = useState('')
    const [isNotActive, setIsNotActive] = useState(false)
    const [gameover, setGameover] = useState(false)
    const [question, setQuestion] = useState({
        text: '',
        answers: [],
        num: 0,
    })

    const [startGame] = useMutation(() => startQuiz(), {
        onSuccess: (data) => {
            setQuiz(data.quiz)
            setQuestion(data.question)
            console.log(data, 'DATA')
        },
    })
    console.log(question, '-----QUESTION')

    const [sendAnswer] = useMutation((selectedAns) => submitAnswer(quiz, question.answers[selectedAns]), {
        onSuccess: (res) => {
            const { data } = res
            const changeQuestion = () => {
                setTimeout(() => {
                    // setCorrectAns('');
                    select(0)
                    if (data.active === false) {
                        setIsNotActive(true)
                    } else if (!data.gameover) {
                        setQuestion(data.question)
                    } else {
                        setGameover(true)
                    }
                }, 1800);
            }

            setTimeout(() => {
                setCorrectAns(data.correct)
            }, 800);
            changeQuestion()
            console.log(res, '---- RES SEND ANSWER')
        },
    })

    useEffect(() => {
        startGame()
    }, [startGame])

    //text, isSelected, correct, onClickHandler, answered
    return (
        <div className="wrapper">
            <div className="game">
                <Question question={question.text} num={question.num} />
                {question.answers.map((ans, i) => {
                    return (
                        <Answer
                            key={i}
                            text={ans}
                            correct={correctAns}
                            onClickHandler={() => {
                                select(i + 1)
                                return sendAnswer(i + 1)
                            }}
                            isSelected={selected}
                            answered={selected}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Multiplayer
