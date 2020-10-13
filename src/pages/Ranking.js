import React, { useState, useEffect } from 'react'
import RankingTitle from '../components/RankingTitle'
import RankingItem from '../components/RankingListItem'
import { rankingLists } from '../services/stats'

const ENUM_RANKING = ['currentRankingList', 'rankingLastPeriod', 'top10ranking']

export default function Ranking(props) {
    const [selected, select] = useState(0)
    const [currentPeriod, setCurrentPeriod] = useState('')
    const [lastPeriod, setLastPeriod] = useState('')
    const [rankingList, setRankingList] = useState([])
    const [data, setData] = useState(null)

    useEffect(() => {
        const asyncCall = async () => {
            const res = await rankingLists()
            if (res) {
                setData(res)
            }
        }
        asyncCall()
    }, [])

    useEffect(() => {
        let list = []
        if (data) {
            const rankingListName = ENUM_RANKING[selected]
            data.data[rankingListName].rankingList.forEach((item, i) => {
                const listItem = (
                    <RankingItem
                        key={i}
                        place={i + 1}
                        name={item.fullName}
                        score={item.score}
                        time={item.duration}
                    />
                )
                list.push(listItem)
            })
            setCurrentPeriod(data.data.currentRankingList.rankingListTitle)
            setLastPeriod(data.data.rankingLastPeriod.rankingListTitle)
        }
        setRankingList(list)
    }, [selected, data])

    return (
        <div className="wrapper">
            <div className="ranking">
                <RankingTitle
                    select={select}
                    selected={selected}
                    currentPeriod={currentPeriod || '...'}
                    lastPeriod={lastPeriod || '...'}
                />
                <div className="ranking-list">{rankingList}</div>
            </div>
        </div>
    )
}
