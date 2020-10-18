import React from 'react'
import Button from './Button'

const TimeIsUpMessage = ({ onClick }) => {
    return (
        <div className="wrapper">
            <div className="congrats">
                <h3>Predviđeno vrijeme za igranje kviza je isteklo.</h3>
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

export default TimeIsUpMessage
