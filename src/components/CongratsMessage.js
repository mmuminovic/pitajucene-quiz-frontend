import React from 'react'
import award from '../assets/images/certificate.png'
import Button from '../components/Button'

export const CongratsMessage = ({ onClick }) => {
    return (
        <div className="wrapper">
            <div className="congrats">
                <img src={award} alt="award" width="100px" />
                <h1>Čestitamo!</h1>
                <h2>Stigli ste do kraja kviza.</h2>
                <h3>Rekao je Allahov Poslanik, sallallahu alejhi ve sellem:</h3>
                <h4>
                    "Ko krene putem na kojem traži znanje, Allah će ga, doista,
                    usmjeriti ka putu od puteva koji vode u Džennet. Doista
                    meleki prostiru svoja krila od dragosti pred onim koji traži
                    znanje..." (dio hadisa)
                </h4>
                <Button type="submit active" onClick={onClick}>
                    Vrati se na početnu
                </Button>
            </div>
        </div>
    )
}
