import React from 'react'
import * as colors from '../styles/main.scss'

const ScoreProgressBar = ({ score }) => {
    const scoreProgress = score / 9
    const percentage = scoreProgress + '%'

    return (
        <div
            style={{
                width: '100%',
                position: 'relative',
            }}
        >
            <div
                style={{
                    backgroundColor: 'yellow',
                    height: '8px',
                    width: percentage,
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

export default ScoreProgressBar
