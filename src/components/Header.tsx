import React, { ChangeEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import photo from "../asset/image/logo.png";
import { Icon } from '@iconify/react';

const Header: React.FC = ({setIsSignedIn}) => {
    const handleNavigate = (e: ChangeEvent<HTMLElement>) => {
        setIsSignedIn(false)
        window.location.href= '/';

    }                       
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand ><img src={photo} className='logo' alt='logo'></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto d-md-block d-sm-none d-lg-block">
                            <Nav.Link ><p className='text-light  mt-4 d-md-block'>ABC sports Organization </p></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link id="collapsible-nav-dropdown"><p className='fs-3 text-light'><Icon icon="bxs:user-circle" /></p></Nav.Link>
                            <NavDropdown title="Javith B" id="collapsible-nav-dropdown" className='mt-2 fs-5 me-5 text-light'>
                                <NavDropdown.Item href="#action/3.1">Organization info</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4" onClick={(e) => handleNavigate(e)}>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;