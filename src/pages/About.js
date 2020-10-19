import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import * as colors from '../styles/main.scss'

const About = () => {
    const history = useHistory()
    const auth = useSelector((state) => state.auth.token)
    if (!auth) {
        history.push('/login')
    }
    return (
        <div className="wrapper">
            <div className="profile" style={{ textAlign: 'center' }}>
                <div className="profile-card profile-card__title">Verzija</div>
                <div className="profile-card profile-card__text">v2.0 beta</div>
                <div className="profile-card profile-card__title">
                    Kontakt osoba
                </div>
                <div className="profile-card profile-card__text">
                    <a
                        href="https://pitajucene.com/profile/sedin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: colors.secondary }}
                    >
                        Sedin Kutlovac
                    </a>
                </div>
                <div className="profile-card profile-card__title">
                    Software developer
                </div>
                <div className="profile-card profile-card__text">
                    <a
                        href="https://pitajucene.com/profile/muhamed-muminovic/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: colors.secondary }}
                    >
                        Muhamed Muminović
                    </a>
                </div>
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
        </div>
    )
}

export default About
