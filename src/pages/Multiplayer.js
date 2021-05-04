import React, { useState, useEffect } from 'react'
import { startQuiz, submitAnswer } from '../services/quiz'
import { useMutation } from 'react-query'

import Question from '../components/Question'
import Answer from '../components/Answer'


const Multiplayer = () => {
    const [question, setQuestion] = useState({
        text: '',
        answers: [],
        num: 0,
    })


    const [startGame] = useMutation(() => startQuiz(), {
        onSuccess: (data) => {
            setQuestion(data.question)

            console.log(data, 'DATA')
        },
    })
    console.log(question, '-----QUESTION')


    useEffect(() => {
        startGame()
    }, [startGame])

 //text, isSelected, correct, onClickHandler, answered
    return (
        <div className="wrapper">
            <Question question={question.text} num={question.num} />
            {question.answers.map((ans, i) => {
                return <Answer 
                        text={ans}
                        key={i}/>
            })
            }
        </div>
    )
}

export default Multiplayer
