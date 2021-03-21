import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { getScores } from '../services/stats'
import RankingItem from '../components/RankingListItem'
import Loader from '../components/Spinner'
import Button from '../components/Button'
import { setWinner } from '../services/user'
import WinnerIcon from '../assets/images/0.png'

const Profile = (props) => {
    const history = useHistory()
    const { isAdmin } = useSelector((state) => state.auth)
    const playerId = props.location.state.id

    const { data, isLoading, refetch: refetchScores } = useQuery(
        'scores',
        () => getScores(playerId),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
        }
    )

    const [toggleWinner] = useMutation(() => setWinner(playerId), {
        onSuccess: (data) => {
            refetchScores()
        },
    })

    return (
        <div className="wrapper">
            {isLoading ? (
                <Loader />
            ) : data.data ? (
                <div className="profile">
                    {data.data.user.isWinner && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                margin: '16px 0',
                            }}
                        >
                            <img src={WinnerIcon} alt="winner" width="30px" />
                        </div>
                    )}
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
                        {isAdmin && (
                            <Button
                                type="submit active"
                                onClick={() => toggleWinner()}
                                style={{
                                    marginTop: '1rem',
                                    fontSize: '1.4rem',
                                    padding: '1rem 1.6rem',
                                    borderRadius: '1rem',
                                }}
                            >
                                Postavi za pobjednika
                            </Button>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Profile
