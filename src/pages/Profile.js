import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { myScores } from '../services/stats'
import RankingItem from '../components/RankingListItem'
import Loader from '../components/Spinner'
import Button from '../components/Button'

const Profile = () => {
    const history = useHistory()

    const { data, isLoading } = useQuery('myscores', () => myScores(), {
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    })

    return (
        <div className="wrapper">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="profile">
                    <div className="profile-card profile-card__title">Ime</div>
                    <div className="profile-card profile-card__text">
                        {data.data.user.fullName}
                    </div>
                    <div className="profile-card profile-card__title">
                        Email
                    </div>
                    <div className="profile-card profile-card__text">
                        {data.data.user.email}
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            type="submit active"
                            onClick={() => history.push('/')}
                            style={{
                                marginTop: '1rem',
                                fontSize: '1.4rem',
                                padding: '1rem 1.6rem',
                                borderRadius: '1rem',
                            }}
                        >
                            Vrati se na početnu
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
