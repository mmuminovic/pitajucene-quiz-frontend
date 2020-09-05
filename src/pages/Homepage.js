import React from 'react'
import { useHistory } from 'react-router-dom'
import HomeButton from '../components/HomeButton'

export default function Homepage() {
    const history = useHistory()
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
            </div>
        </div>
    )
}
