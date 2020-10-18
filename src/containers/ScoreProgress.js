import React from 'react'
import { ScoreProgressBar } from '../components/ScoreProgressBar'
import { Star } from '@material-ui/icons'
import * as colors from '../styles/main.scss'

export const ScoreProgress = ({ score }) => {
    return (
        <div style={{ display: 'flex', width: '100%', marginTop: '32px' }}>
            <div>
                <Star className="ranking-item__scores--icon icon-star" />
            </div>
            <div style={{ flex: 1, paddingTop: '5px' }}>
                <ScoreProgressBar score={score} />
                <p
                    style={{
                        color: colors.secondary,
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        margin: '0',
                    }}
                >
                    {score}/900
                </p>
            </div>
        </div>
    )
}
