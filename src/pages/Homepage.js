import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeButton from '../components/HomeButton'

const Homepage = () => {
    const history = useHistory()
    const auth = useSelector((state) => state.auth.token)
    console.log(auth)
    if (!auth) {
        history.push('/login')
    }
    console.log(auth)
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

export default Homepage
