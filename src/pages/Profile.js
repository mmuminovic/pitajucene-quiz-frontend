import React, { useState } from 'react'
import RankingItem from '../components/RankingListItem'
import { useQuery } from 'react-query'
import { myScores } from '../services/stats'
import { Loader } from '../components/Spinner'

export const Profile = () => {
    const [isQueryEnabled, setIsQueryEnabled] = useState(true)

    const { data, isLoading } = useQuery('myscores', () => myScores(), {
        enabled: isQueryEnabled,
        onSuccess: () => {
            setIsQueryEnabled(false)
        },
    })

    return (
        <div className="wrapper">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="profile">
                    <div className="profile-card profile-card__title">Ime</div>
                    <div className="profile-card profile-card__text">Test</div>
                    <div className="profile-card profile-card__title">
                        Email
                    </div>
                    <div className="profile-card profile-card__text">
                        test@test.com
                    </div>
                    <div className="profile-card profile-card__title">
                        Najbolji rezultat u ovom kolu
                    </div>
                    <RankingItem
                        name={data.data.user.fullName}
                        score={data.data.score.score}
                        time={data.data.score.duration}
                    />
                    <div className="profile-card profile-card__title">
                        Najbolji rezultat u prethodnom kolu
                    </div>
                    <RankingItem
                        name={data.data.user.fullName}
                        score={data.data.scoreLastMonth.score}
                        time={data.data.scoreLastMonth.duration}
                    />
                    <div className="profile-card profile-card__title">
                        Najbolji rezultat do sad
                    </div>
                    <RankingItem
                        name={data.data.user.fullName}
                        score={data.data.theBestScore.score}
                        time={data.data.theBestScore.duration}
                    />
                </div>
            )}
        </div>
    )
}
