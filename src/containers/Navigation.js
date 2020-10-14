import React, { Component, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap'
import { Menu } from '@material-ui/icons'
import logo from '../assets/images/logo-white.png'

const Navigation = () => {
    const [isNavOpen, changeNavOpen] = useState(false)
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    return (
        <div className="navigation">
            <Navbar expand="xs">
                <NavbarText>
                    <img src={logo} alt="logo" width="32px" />
                </NavbarText>
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav style={{ color: '#fff' }}>
                            {authState.fullName}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Moj profil</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Odjavi se</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Navigation
