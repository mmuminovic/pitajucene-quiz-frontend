import React from 'react'

export default function RankingTitle({ period, title }) {
    return (
        <div className="ranking-title">
            <div>{title}</div>
            <div>{period}</div>
        </div>
    )
}
