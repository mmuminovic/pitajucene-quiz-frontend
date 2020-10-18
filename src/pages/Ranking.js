import React, { useState, useEffect } from 'react'
import RankingTitle from '../components/RankingTitle'
import RankingItem from '../components/RankingListItem'
import { rankingLists } from '../services/stats'
import { useQuery } from 'react-query'
import Loader from '../components/Spinner'

const ENUM_RANKING = ['currentRankingList', 'rankingLastPeriod', 'top10ranking']

const Ranking = () => {
    const [selected, select] = useState(0)
    const [currentPeriod, setCurrentPeriod] = useState('')
    const [lastPeriod, setLastPeriod] = useState('')
    const [rankingList, setRankingList] = useState([])
    const [data, setData] = useState(null)

    const { isLoading } = useQuery('ranking', () => rankingLists(), {
        onSuccess: (data) => {
            setData(data)
        },
    })

    useEffect(() => {
        let list = []
        if (data) {
            const rankingListName = ENUM_RANKING[selected]
            if (data.data[rankingListName].rankingList.length > 0) {
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
            } else {
                const notification = (
                    <p
                        style={{
                            color: '#fff',
                            fontSize: '1.6rem',
                            textAlign: 'center',
                            marginTop: '2rem',
                        }}
                    >
                        Trenutno nema rezultata
                    </p>
                )
                list.push(notification)
            }
            setCurrentPeriod(data.data.currentRankingList.rankingListTitle)
            setLastPeriod(data.data.rankingLastPeriod.rankingListTitle)
        }
        setRankingList(list)
    }, [selected, data])

    return (
        <div className="wrapper">
            {isLoading || !data ? (
                <Loader />
            ) : (
                <div className="ranking">
                    <RankingTitle
                        select={select}
                        selected={selected}
                        currentPeriod={currentPeriod}
                        lastPeriod={lastPeriod}
                    />
                    <div className="ranking-list">{rankingList}</div>
                </div>
            )}
        </div>
    )
}

export default Ranking
