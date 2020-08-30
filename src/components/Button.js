import React from 'react'
import { Button } from 'reactstrap'

export default function ButtonComponent(props) {
    return <Button className={`button-${props.type}`} {...props}>{props.children}</Button>
}
