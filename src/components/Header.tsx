import React, { ChangeEvent, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import photo from "../asset/image/logo.png";
import { Icon } from '@iconify/react';
import axios from 'axios';
import { First } from 'react-bootstrap/esm/PageItem';

const Header: React.FC = ({ setIsSignedIn }) => {
    const [FirstName, setFirstName] = useState<string>("");
    const [LastName, setLastName] = useState<string>("");
    const [org, setOrg] = useState<string>('');
    const [center, setCenter] = useState<string>('');
    const [useid, setUseId] = useState<string>('');
    const [title, setTitle] = useState<string[]>([]);

    const handleNavigate = (e: ChangeEvent<HTMLElement>) => {
        setIsSignedIn(false);
        window.location.href = '/';
    };

    const baseurl = process.env.REACT_APP_BASEURL;

    const account = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/account`);
            const authorities = response.data.authorities;
            localStorage.setItem('authorities', JSON.stringify(authorities));
            const firstName = response.data.firstName;
            const lastName = response.data.lastName;
            const orgname = response.data.orgName;
            const centers = response.data.centerName;      
            setCenter(centers);
            setLastName(lastName);
            setFirstName(firstName);
            setOrg(orgname);
            const centerid = response.data.centerId;
            setUseId(centerid);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchOrganization = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/v1/centers?organizationId.equals=${useid}`);
            const orgData = response.data;
            const centerTitles = orgData.map((center: { title: string }) => center.title);
            setTitle(centerTitles);
        } catch (error) {
            console.error("Error fetching organization data:", error);
        }
    };

    useEffect(() => {
   account();
    }, [useid]);

    useEffect(() => {
        fetchOrganization();
    }, [useid]);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
                <Navbar.Brand>
                    <img
                        src={photo}
                        className="d-inline-block align-top logo mx-3"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='text-light fs-4 mx-3'><span>{org}</span></Nav.Link>
                        <Nav.Link className='fw-bold mx-3 fs-4'>|</Nav.Link>
                        <NavDropdown title={`${center} | Edit`} id="collapsible-nav-dropdown" className='fs-5 ' >
                            <div style={{ height: "160px", overflow: "auto" }}>
                                {title.map((title, index) => (
                                    <NavDropdown.Item key={index}  >
                                        {title}
                                    </NavDropdown.Item>
                                ))}
                            </div>
                        </NavDropdown>
                    </Nav>
                    <Nav style={{ display: 'contents' }}>
                        <Nav.Link>
                            <Icon icon="mingcute:user-4-line" className='fs-2' />
                            <span>{FirstName} {LastName}</span>
                        </Nav.Link>
                        <Nav.Link eventKey={2} >
                            <NavDropdown id="collapsible-nav-dropdown" className=' margin'>
                                <NavDropdown.Item>Organization info</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={(e) => handleNavigate(e)}>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
