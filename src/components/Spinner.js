import React from 'react'
import { Spinner } from 'reactstrap'

const Loader = () => (
    <Spinner
        type="grow"
        style={{ color: '#d8dffd', width: '70px', height: '70px' }}
    />
)

export default Loader