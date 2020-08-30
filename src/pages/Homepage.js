import React from 'react'
import HomeButton from '../components/HomeButton'

export default function Homepage() {
    return (
        <div className="wrapper">
            <div className="home">
                <HomeButton
                    imageUrl={require('../assets/images/play.png')}
                    imageAlt="play"
                    text="Pokreni kviz"
                />
                <HomeButton
                    imageUrl={require('../assets/images/0.png')}
                    imageAlt="ranking"
                    text="Ranglista"
                />
                <HomeButton
                    imageUrl={require('../assets/images/rules.png')}
                    imageAlt="rules"
                    text="Moj profil"
                />
                <HomeButton
                    imageUrl={require('../assets/images/about.png')}
                    imageAlt="about"
                    text="O aplikaciji"
                />
            </div>
        </div>
    )
}
