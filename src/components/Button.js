import React from 'react'
import { Button } from 'reactstrap'

const ButtonComponent = (props) => {
    return (
        <Button className={`button-${props.type}`} {...props}>
            {props.children}
        </Button>
    )
}

export default ButtonComponent
