import React, { ChangeEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import photo from "../asset/image/logo.png";
import axios from "axios";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
const LoginPage: React.FC = ({setIsSignedIn}) => {
    const baseurl = process.env.REACT_APP_BASEURL;
    const Navigate = useNavigate();
    interface login {
        userName: string,
        password: string,
    }
    const [data, setdata] = useState<login>({
        userName: "",
        password: "",
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setdata({ ...data, [event.target.name]: event.target.value });
    }
    const handleSubmit = () => {
        axios({
            method: "post",
            url: `${baseurl}/api/user-management/login`,
            data: data,
        })
            .then(res => {
                localStorage.setItem("accessToken", res.data.accessToken);
                console.log(res.data.accessToken);
                localStorage.setItem("refreshToken",res.data.refreshToken);
                console.log(res.data.refreshToken);
                window.location.href = "/center";
                setIsSignedIn(true);
                console.log(res);
            })
            .catch(err => {
                Navigate("/");
                console.log(err);
            })  
    }
    return (
        <div>
            <Container fluid className="p-0 col-sm-12 col-md-12 " >
                <div className="backgroundImage">
                    <Navbar >
                        <Container>
                            <Navbar.Brand >
                                <img
                                    alt=""
                                    src={photo}
                                    width="300"
                                    height="120"
                                    className="d-inline-block align-top"
                                />
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Row >
                        <Col xs={4} sm={5} lg={6} className=" text-center  m-lg-auto m-md-auto  h-50  text-light d-none d-md-block  ">

                            <h4 className="fs-2">Book sports center</h4>
                            <div className="row">
                                <div className="col-1 hr mt-3 mb-3"></div>
                            </div>
                            <h4 className="fs-2">Connect with other players</h4>
                            <div className="row">
                                <div className="col-1 hr mt-3 mb-3"></div>
                            </div>
                            <h4 className="fs-2">Signup for lessons</h4>         
                        </Col>
                        <Col sm={8} lg={5} xl={4} md={4} className="ps-2 pe-4  ms-2"  >
                            <div className=" bg-light rounded-2 p-4 mt-5 me-lg-5 m-0" >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="mt-2 mb-4">Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Email Address" name="userName" value={data.userName} onChange={(e) => handleChange(e)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="mt-2 mb-4">Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={(e) => handleChange(e)} />
                                </Form.Group>
                                <Col className="text-end">
                                    <p className="text-danger"> Forgot Password ?</p></Col>
                                <Col >
                                    <Button className="w-100 " variant="danger" onClick={(e: any) => handleSubmit(e)}>Submit</Button>
                                </Col>
                                <div>
                                    <Row>
                                        <Col><p className="mt-3 mb-2" >Don't have an account?</p> <p className="text-danger fw-bold">Sign up</p></Col>
                                        <Col><p className="p-0 mb-2 mt-3 ">Are you a sports organiztion?</p> <p className="text-danger fw-bold">Partner with us</p></Col>
                                    </Row>
                                </div>
                            </div>
                            {/* <DigitalClock /> */}
                        </Col>
                    </Row>
                </div>
            </Container>
        </div >
    )
}
export default LoginPage;