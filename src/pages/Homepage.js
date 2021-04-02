import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeButton from '../components/HomeButton'
import { useQuery } from 'react-query'
import { homeStats } from '../services/stats'

const Homepage = () => {
    const history = useHistory()
    const userId = useSelector((state) => state.auth.id)

    const { data: stats = { data: {} }, isFetching } = useQuery(
        'stats',
        () => homeStats(),
        {
            refetchOnWindowFocus: true,
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
                    onClick={() => history.push('/profile', { id: userId })}
                />
                <HomeButton
                    imageUrl={require('../assets/images/about.png')}
                    imageAlt="about"
                    text="O aplikaciji"
                    onClick={() => history.push('/about')}
                />
                <a
                    href="https://pitajucene.com/nagradni-kviz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="profile-card profile-card__text">
                        <div style={{ textAlign: 'center' }}>Pravila igre</div>
                    </div>
                </a>
                {!isFetching && stats.data ? (
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <div className="text-white">
                            <span>Trenutno igra: </span>
                            <span>{stats.data.activeGames}</span>
                        </div>
                        <div className="text-white">
                            <span>Odigrano danas: </span>
                            <span>{stats.data.gamesToday}</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Homepage
