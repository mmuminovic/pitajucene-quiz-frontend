import React from 'react'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const Message = ({ children }) => {
    const history = useHistory()
    return (
        <div className="center-xy fd-col">
            <div className="message">Greška na serveru. Pokušajte ponovo.</div>
            <Button
                style={{ marginTop: '16px' }}
                onClick={() => history.push('/')}
            >
                Vrati se na početnu
            </Button>
        </div>
    )
}

export default Message
