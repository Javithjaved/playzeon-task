import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const CenterPage: React.FC = () => {
    const Navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const baseurl = process.env.REACT_APP_BASEURL;
    const getappapi = process.env.REACT_APP_GETALLAPI;
    const [centerData, setCenterData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${baseurl}${getappapi}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );
            setCenterData(response.data);        
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);
    const handleClick = () => {
        Navigate('/reservation');
    }
    return (
        <Container>
            <Row>
                <Col xs={10} className="backgroundcolor w-100">
                    <p className="fw-bold">Center</p>
                    <hr></hr>
                    <div className="bg-white rounded-3 p-2  ">
                        <Row className="w-100">
                            {centerData.map((center) => (
                                <Card key={center.id} style={{ width: '17rem' }} className="cardimage mx-3 mt-4  p-0">
                                    <Card.Img variant="top" className="cardimage" onClick={() => handleClick()} />
                                    <Card.Body className="cardBody" onClick={() => handleClick()}>
                                        <Card.Text className="Cardtext fw-medium">
                                            <div>
                                                {center.streetAddress}, {center.city},
                                            </div>
                                            {center.stateProvince} ,
                                            <p className="fw-medium fs-6 text-secondary">Business hours</p>
                                            {center.centerHours.map((hours: { id: React.Key | null | undefined; weekday: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; startTime: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; endTime: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                                <p className="fw-medium" key={hours.id}>
                                                    {hours.weekday}: {hours.startTime} - {hours.endTime}
                                                </p>
                                            ))}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CenterPage;
