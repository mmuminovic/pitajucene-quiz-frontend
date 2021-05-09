import React from 'react'
import { Spinner } from 'reactstrap'
import * as colors from '../styles/main.scss'

const Loader = () => (
    <Spinner
        type="grow"
        style={{ color: colors.secondary, width: '70px', height: '70px' }}
    />
)

export default Loader