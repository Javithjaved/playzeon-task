import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardImg, Col, Container, Placeholder, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CenterPage: React.FC = () => {
    const Navigate = useNavigate();
    const baseurl = process.env.REACT_APP_BASEURL;
    const [centerData, setCenterData] = useState<any[]>([]);
    const [useid, setUseId] = useState("");
    const [showContent, setShowContent] = useState<string>("");
    const [idValue, setIdValue] = useState([]);
      const centerids = localStorage.getItem("CurrentCenterId");
    const account = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/account`);
            const authorities = response.data.authorities;
            localStorage.setItem('authorities', JSON.stringify(authorities));
            const useidResponse = response.data.orgId;
            console.log(useidResponse);
            localStorage.getItem("orgId", useidResponse);
            const centerid = response.data.centerId;
            console.log(centerid);
            setUseId(useidResponse);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCenterData = async () => {
        if (useid) {
            try {
                const response = await axios.get(`${baseurl}/api/v1/centers?organizationId.equals=${useid}`);
                console.log(response.data);
                setCenterData(response.data);
                setShowContent(true);
                const organizationIds = response.data.map((item: { organization: { id: number; }; }) => item.organization.id);
                // console.log(organizationIds);
                setIdValue(organizationIds);
                console.log(idValue);

            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
    };
    useEffect(() => {
        account();
        fetchCenterData();
    }, [useid]);
    const handleClick = (id: string) => {
        console.log("Clicked on id:", id);
        localStorage.setItem("CurrentCenterId", id);
        Navigate("/reservation")
    };
    if (!showContent) {
        return (
            <div>
                <Row >
                    <Col xs={12} className=' mt-3'>
                        <div className="d-flex justify-content-between">
                            <Card style={{ width: '18rem' }}>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={12} size="lg" />
                                </Placeholder>
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                        <Placeholder xs={6} /> <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={6} />
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={12} size="lg" />
                                </Placeholder>
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                        <Placeholder xs={6} /> <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={6} />
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={12} size="lg" />
                                </Placeholder>
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                        <Placeholder xs={6} /> <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={6} />
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={12} size="lg" />

                                </Placeholder>
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                        <Placeholder xs={6} /> <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={6} />
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
    return (
        <Container>
            <Row>
                <Col xs={10} className="backgroundcolor w-100">
                    <p className="fw-bold">Center</p>
                    <hr></hr>
                    <div className="bg-white rounded-3 p-2">
                        <Row className="w-100">
                            {centerData.map((center) => (
                                <Col key={center.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                                    <Card>
                                        <Card.Body className="p-0">
                                            {center.photos && center.photos.length > 0 ? (
                                                <Card.Img
                                                    variant="top"
                                                    src={center.photos[0].url}
                                                    className="cardImage"
                                                    style={{ height: "100px" }}
                                                    onClick={() => handleClick(center.id)}
                                                />

                                            ) : (
                                                <div className="cardimage"></div>
                                            )}
                                            <Card.Text className="fw-medium Cardtext cardBody  p-2" onClick={() => handleClick(center.id)}>
                                                <div>
                                                    {center.streetAddress}, {center.city},
                                                </div>
                                                {center.stateProvince},
                                                <p className="fw-medium fs-6 text-secondary">Business hours</p>
                                                {center.centerHours.map((hours: any) => (
                                                    <p className="fw-medium" key={hours.id}>
                                                        {hours.weekday}: {hours.startTime} - {hours.endTime}
                                                    </p>
                                                ))}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CenterPage;
