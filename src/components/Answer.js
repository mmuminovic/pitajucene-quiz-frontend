import React from 'react'

export default function Answer({
    text,
    isSelected,
    correct,
    onClickHandler,
    answered,
}) {
    const isCorrect = text === correct
    let answerClassName = 'game-answers__answer'
    if (isSelected && correct === '') {
        answerClassName = [answerClassName, 'selected'].join(' ')
    } else if (isSelected && isCorrect) {
        answerClassName = [answerClassName, 'correct'].join(' ')
    } else if (isSelected && !isCorrect) {
        answerClassName = [answerClassName, 'incorrect'].join(' ')
    }

    if (!isSelected && isCorrect) {
        answerClassName = answerClassName = [answerClassName, 'correct'].join(
            ' '
        )
    }

    if (!isSelected && answered) {
        answerClassName = [answerClassName, 'disabled'].join(' ')
    }

    return (
        <div
            className={answerClassName}
            onClick={() => {
                if (!answered) {
                    onClickHandler()
                }
            }}
        >
            {text}
        </div>
    )
}
