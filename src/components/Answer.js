import React from 'react'

export default function Answer({
    text,
    isSelected,
    isCorrect,
    onClickHandler,
}) {
    let answerClassName = 'game-answers__answer'
    if (isSelected && isCorrect === true) {
        answerClassName = [answerClassName, 'correct'].join(' ')
    } else if (isSelected && isCorrect === false) {
        answerClassName = [answerClassName, 'incorrect'].join(' ')
    } else if (isSelected && (isCorrect === null || isCorrect === undefined)) {
        answerClassName = [answerClassName, 'incorrect'].join(' ')
    }
    return (
        <div className={answerClassName} onClick={onClickHandler}>
            {text}
        </div>
    )
}
