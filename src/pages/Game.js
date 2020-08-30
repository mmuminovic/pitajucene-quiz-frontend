import React, { useState } from 'react'
import Question from '../components/Question'
import Answer from '../components/Answer'

export default function Game(props) {
    const [selected, select] = useState(0)
    
    return (
        <div className="wrapper">
            <div className="game">
                <Question num={2} question="Is this real question?" />
                <div className="game-answers">
                    <Answer
                        text="No, it is not"
                        onClickHandler={() => select(1)}
                        isSelected={selected === 1}
                    />
                    <Answer
                        text="No, it is not too"
                        onClickHandler={() => select(2)}
                        isSelected={selected === 2}
                    />
                    <Answer
                        text="No, it is not again"
                        onClickHandler={() => select(3)}
                        isSelected={selected === 3}
                    />
                    <Answer
                        text="Yes, it is"
                        onClickHandler={() => select(4)}
                        isSelected={selected === 4}
                        isCorrect={true}
                    />
                </div>
            </div>
        </div>
    )
}
