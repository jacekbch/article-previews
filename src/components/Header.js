import React from 'react';
import { Navbar, NavbarBrand, Container } from 'reactstrap';

const Header = () => (
    <Navbar color="dark" dark expand="md">
        <Container>
            <NavbarBrand href="/">Article Previes</NavbarBrand>
        </Container>
    </Navbar>
);

export default Header;