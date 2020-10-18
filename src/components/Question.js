import React from 'react'

const Question = ({ num, question }) => {
    return (
        <div className="game-question">
            <div>Pitanje ({num}/60):</div>
            <div>{question}</div>
        </div>
    )
}

export default Question
