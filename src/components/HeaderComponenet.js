import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import { NavLink, Redirect } from 'react-router-dom';

let counter = 0;
class HeaderComponenet extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        counter += 1;
        this.toggleModal();
        this.props.isAuth(this.username.value, this.password.value, counter);
        event.preventDefault();
    }
    counter

    render() {


        if (this.props.maxAtempt) {
            alert('Please find an Supervisor the maximum attempts reaced');
            return (
            <div>
                <Redirect to="/" />
            </div>
    
          )
        }

        console.log(this.props.authStatus)
        const NavShow = () => {
            if (this.props.authStatus) {
                return (
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/checkDistance">
                                Distance
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/closestCountry">
                                Closest Country
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/countrySearch">
                                Country Serach
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/timeZone">
                                Country TimeZone Serach
                            </NavLink>
                        </NavItem>
                    </Nav>
                );
            }
            return null;

        }
        return (
            <>
                <Navbar dark color="primary" expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand href="/">Home</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <NavShow />
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}> Login</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">User Name</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" className="primary" >Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
export default HeaderComponenet;