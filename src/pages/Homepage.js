import React from 'react'

export default function Homepage() {
    return (
        <div className="wrapper">
            <div className="home">
                <div className="home-button">
                    <img
                        className="home-button__icon"
                        src={require('../assets/images/play.png')}
                        alt="play"
                    />
                    <span className="home-button__text">Pokreni kviz</span>
                </div>
                <div className="home-button">
                    <img
                        className="home-button__icon"
                        src={require('../assets/images/0.png')}
                        alt="ranking"
                    />
                    <span className="home-button__text">Ranglista</span>
                </div>
                <div className="home-button">
                    <img
                        className="home-button__icon"
                        src={require('../assets/images/rules.png')}
                        alt="rules"
                    />
                    <span className="home-button__text">Moj profil</span>
                </div>
                <div className="home-button">
                    <img
                        className="home-button__icon"
                        src={require('../assets/images/about.png')}
                        alt="about"
                    />
                    <span className="home-button__text">O aplikaciji</span>
                </div>
            </div>
        </div>
    )
}
