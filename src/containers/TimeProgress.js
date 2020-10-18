import React from 'react'
import TimeProgressBar from '../components/TimeProgressBar'
import { useTimer } from 'react-compound-timer'
import { AccessAlarm as Time } from '@material-ui/icons'
import * as colors from '../styles/main.scss'

export const TimeProgress = () => {
    const timer = useTimer({
        direction: 'backward',
        initialTime: 1000 * 60 * 30,
    })

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div>
                <Time className="ranking-item__scores--icon icon-time" />
            </div>
            <div style={{ flex: 1, paddingTop: '5px' }}>
                <TimeProgressBar timer={timer} />
                <p
                    style={{
                        color: colors.secondary,
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        margin: '0',
                    }}
                >
                    <span>
                        {timer.value.m < 10
                            ? '0' + timer.value.m
                            : timer.value.m}
                    </span>{':'}
                    <span>
                        {timer.value.s < 10
                            ? '0' + timer.value.s
                            : timer.value.s}
                    </span>
                </p>
            </div>
        </div>
    )
}
