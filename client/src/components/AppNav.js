import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

class AppNav extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return(

            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <RegisterModal />
                                </NavItem>
                                <NavItem>
                                    <Logout />
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/shubhamjha25/ShoppingList" target="_blank">GitHub</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}


export default AppNav;