import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/index';
// import classes from './Navigation.module.css';
import Logo from '../../images/logo1.png';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Aux from 'react-aux';
import './Navigation.module.css';

class Navigation extends Component {
    state = {
        expanded: false,
        setExpanded: false
    }

    render() {
        let navlinks, adminPanel;
        if (this.props.isAdmin) {
            adminPanel = (
                <Aux>
                    <NavItem eventkey={11} href="/">
                        <Nav.Link onClick={() => this.setState({ expanded: false })} as={Link} to="/sva-pitanja">Pitanja</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={21} href="/">
                        <Nav.Link onClick={() => this.setState({ expanded: false })} as={Link} to="/korisnici">Korisnici</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={41} href="/">
                        <Nav.Link onClick={() => this.setState({ expanded: false })} as={Link} to="/citati">Citati</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={31} href="/">
                        <Nav.Link onClick={() => this.setState({ expanded: false })} as={Link} to="/primjedbe">Primjedbe</Nav.Link>
                    </NavItem>
                </Aux>
            );
        }
        if (this.props.isAuth) {
            let profil = `/korisnik/${this.props.user.userId}`
            navlinks = (
                <Navbar expand="lg" bg="dark" variant="dark" fixed="top" onToggle={this.setNavExpanded} expanded={this.state.expanded}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => this.setState({ expanded: !this.state.expanded })} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" onSelect={this.closeNav} style={{ margin: '5px auto' }}>
                            <NavItem>
                                <Navbar.Brand href="https://www.pitajucene.com" target="_blank"><img src={Logo} alt="logo" style={{ width: '40px', paddingBottom: '5px' }} /></Navbar.Brand>
                            </NavItem>
                            <NavItem eventkey={1} href="/">
                                <Nav.Link onClick={() => this.setState({ expanded: false })} as={Link} to="/" >Kviz</Nav.Link>
                            </NavItem>
                            <NavItem eventkey={2} href="/">
                                <Nav.Link onClick={() => this.setState({ expanded: false })} as={Link} to="/ranglista" >Ranglista</Nav.Link>
                            </NavItem>
                            {adminPanel}
                            <NavItem eventkey={3} href="/">
                                <Nav.Link onClick={() => this.setState({ expanded: false })} as={Link} to={profil} >Profil</Nav.Link>
                            </NavItem>
                            <NavItem eventkey={4} href="/">
                                <Nav.Link onClick={() => {
                                    this.setState({ expanded: false })
                                    this.props.logoutUser();
                                }
                                } to="/" >Odjavi se</Nav.Link>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }

        return (
            <div>
                {navlinks}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));