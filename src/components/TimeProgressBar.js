import React from 'react'
import * as colors from '../styles/main.scss'

export const TimeProgressBar = ({ timer }) => {
    const total = 1000 * 60 * 30
    const passedTime = timer.controls.getTime()
    const remainingInPercentage = 100 * (passedTime / total)
    const remainingBarPercentage = remainingInPercentage + '%'

    return (
        <div
            style={{
                width: '100%',
                position: 'relative',
            }}
        >
            <div
                style={{
                    backgroundColor: colors.red,
                    height: '8px',
                    width: remainingBarPercentage,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: '1rem',
                }}
            ></div>
            <div
                style={{
                    backgroundColor: colors.secondary,
                    height: '8px',
                    width: '100%',
                    borderRadius: '1rem',
                }}
            ></div>
        </div>
    )
}
