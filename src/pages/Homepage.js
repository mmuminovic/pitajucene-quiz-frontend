import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeButton from '../components/HomeButton'
import { useQuery } from 'react-query'
import { homeStats } from '../services/stats'
import Loader from '../components/Spinner'

const Homepage = () => {
    const history = useHistory()
    const auth = useSelector((state) => state.auth.token)
    if (!auth) {
        history.replace('/login')
    }

    const { data: stats = { data: {} }, isFetching } = useQuery(
        'stats',
        () => homeStats(),
        {
            onSuccess: (data) => {
                console.log(data)
            },
        }
    )

    return (
        <div className="wrapper">
            <div className="home">
                <HomeButton
                    imageUrl={require('../assets/images/play.png')}
                    imageAlt="play"
                    text="Pokreni kviz"
                    onClick={() => history.push('/game')}
                />
                <HomeButton
                    imageUrl={require('../assets/images/0.png')}
                    imageAlt="ranking"
                    text="Ranglista"
                    onClick={() => history.push('/ranking')}
                />
                <HomeButton
                    imageUrl={require('../assets/images/rules.png')}
                    imageAlt="rules"
                    text="Moj profil"
                    onClick={() => history.push('/profile')}
                />
                <HomeButton
                    imageUrl={require('../assets/images/about.png')}
                    imageAlt="about"
                    text="O aplikaciji"
                    onClick={() => history.push('/about')}
                />
                {!isFetching && (
                    <div style={{ textAlign: 'center' }}>
                        <div className="text-white">
                            <span>Trenutno igra: </span>
                            <span>{stats.data.activeGames}</span>
                        </div>
                        <div className="text-white">
                            <span>Odigrano danas: </span>
                            <span>{stats.data.gamesToday}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Homepage
