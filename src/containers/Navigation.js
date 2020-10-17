import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    Navbar,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap'
import logo from '../assets/images/logo-white.png'
import { authSlice } from '../store/authSlice'

const Navigation = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    return (
        <>
            {authState.token && (
                <div className="navigation">
                    <Navbar expand="xs">
                        <NavbarText
                            onClick={() => history.push('/')}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={logo} alt="logo" width="32px" />
                        </NavbarText>

                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle
                                    nav
                                    style={{
                                        color: '#fff',
                                        fontSize: '1.4rem',
                                    }}
                                >
                                    {authState.fullName}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem
                                        style={{ fontSize: '1.4rem' }}
                                    >
                                        Moj profil
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem
                                        style={{ fontSize: '1.4rem' }}
                                        onClick={() => {
                                            dispatch(authSlice.actions.auth())
                                            history.replace('/login')
                                        }}
                                    >
                                        Odjavi se
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Navbar>
                </div>
            )}
        </>
    )
}

export default Navigation
