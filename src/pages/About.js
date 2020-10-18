import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../components/Button'

const About = () => {
    const history = useHistory()
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