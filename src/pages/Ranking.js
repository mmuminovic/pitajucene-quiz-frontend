import React, { useState } from 'react'
import RankingTitle from '../components/RankingTitle'
import RankingItem from '../components/RankingListItem'

export default function Ranking(props) {
    const [selected, select] = useState(0)
    let rankingList = []
    for (let i = 0; i < 10; i++) {
        const listItem = (
            <RankingItem
                key={i}
                place={i + 1}
                name="Muhamed Muminovic"
                score="200"
                time="9:21"
            />
        )
        rankingList.push(listItem)
    }
    return (
        <div className="wrapper">
            <div className="ranking">
                <RankingTitle
                    select={select}
                    selected={selected}
                    currentPeriod="1. septembar - 15. septembar"
                    lastPeriod="15. avgust - 31. avgust"
                />
                <div className="ranking-list">{rankingList}</div>
            </div>
        </div>
    )
}
