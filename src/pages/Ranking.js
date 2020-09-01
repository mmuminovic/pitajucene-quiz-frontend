import React from 'react'
import RankingTitle from '../components/RankingTitle'
import RankingItem from '../components/RankingListItem'

export default function Ranking(props) {
    let rankingList = []
    for(let i=0; i<10; i++){
        const listItem = (<RankingItem
            place={i+1}
            name="Muhamed Muminovic"
            score="200"
            time="9:21"
        />)
        rankingList.push(listItem)
    }
    return (
        <div className="wrapper">
            <div className="ranking">
                <RankingTitle
                    title="Rang lista"
                    period="1.septembar - 15. septembar"
                />
                <div className="ranking-list">
                    {rankingList}
                </div>
            </div>
        </div>
    )
}
