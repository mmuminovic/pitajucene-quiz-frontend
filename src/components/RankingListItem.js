import React from 'react'
import { AccessAlarm as Time, Star } from '@material-ui/icons'

export default function RankingItem({ place, name, score, time }) {
    return (
        <div className="ranking-user">
            <div>{`${place}. ${name}`}</div>
            <div className="ranking-user__scores">
                <div className="d-flex justify-content-center align-items-center">
                    <Star className="ranking-user__scores--icon icon-star" />
                    <span>{score}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <Time className="ranking-user__scores--icon icon-time" />
                    <span>{time}</span>
                </div>
            </div>
        </div>
    )
}
