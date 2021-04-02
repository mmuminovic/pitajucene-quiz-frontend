import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../components/Button'
import * as colors from '../styles/main.scss'

const About = () => {
    const history = useHistory()

    return (
        <div className="wrapper">
            <div className="profile" style={{ textAlign: 'center' }}>
                <div className="profile-card profile-card__title">Verzija</div>
                <div className="profile-card profile-card__text">v2.0</div>
                <div className="profile-card profile-card__title">
                    Kontakt osoba
                </div>
                <div className="profile-card profile-card__text">
                    <div style={{ color: colors.secondary }}>
                        Sedin Kutlovac
                    </div>
                    <div style={{ color: colors.secondary }}>+38762645414 (WhatsApp)</div>
                    <div style={{ color: colors.secondary }}>info@pitajucene.com</div>
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
