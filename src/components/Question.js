import React from 'react'

export default function Question({ num, question }) {
    return (
        <div className="game-question">
            <div>Pitanje ({num}/60):</div>
            <div>{question}</div>
        </div>
    )
}
