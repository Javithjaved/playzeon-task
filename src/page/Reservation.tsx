import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, FloatingLabel, Form, Offcanvas, Row } from "react-bootstrap";
import { Facilitytype, Facilities, BookingType, FrequencyWeeks, time, days } from '../utils/data.tsx';
import Moment from "react-moment";
import 'react-datepicker/dist/react-datepicker.css';

interface userData {
    data: string;
    setData: React.Dispatch<React.SetStateAction<string[]>>;
    bookingType: string;
    setBookingType: React.Dispatch<React.SetStateAction<string[]>>;
    showFrequency: string;
    setShowFrequency: React.Dispatch<React.SetStateAction<string[]>>;
    timevalue: string;
    setTimeValue: React.Dispatch<React.SetStateAction<[]>>;
    timeset: string;
    settimeSet: React.Dispatch<React.SetStateAction<string[]>>;
}

const Reservation: React.FC<userData> = ({ data, setData, bookingType, setBookingType, showFrequency, setShowFrequency, timevalue, setTimeValue, timeset, settimeSet }) => {
    const Facility = Facilitytype;
    const Facilitie = Facilities;
    const Booking = BookingType;
    const weeks = FrequencyWeeks;
    const day = days;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
//test commit
    const handleBookingTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookingType(e.target.value);
        if (e.target.value === "Single booking") {
            setShowFrequency(false);
        } else {
            setShowFrequency(true);
        }
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startDateValue = e.target.value;
        setTimeValue({ ...timevalue, startdate: startDateValue });
        if (bookingType === "Single booking") {
            settimeSet({ ...timeset, enddate: startDateValue });
        }
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        settimeSet({ ...timeset, enddate: e.target.value });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Row>
                <Col xs={12} className="backgroundcolor">
                    <div className="bg-white rounded-3 p-2">
                        <Row >
                            <Col  ><Icon icon="akar-icons:box" className="iconcolor me-1 " /> <span>Player/Not Paid</span></Col>
                            <Col ><Icon icon="akar-icons:box" className="iconcoach me-1" /><span>Coach</span></Col>
                            <Col ><Icon icon="akar-icons:box" className="iconadmin me-1" /><span>Admin</span></Col>
                            <Col ><Icon icon="akar-icons:box" className="iconmaintenance me-1" /><span>Maintenance</span></Col>
                            <Col ><Icon icon="akar-icons:box" className="icontournament me-1" /><span>Tournament</span></Col>
                            <Col ><Icon icon="akar-icons:box" className="iconPlayer me-1" /><span>Player/Paid</span></Col>
                            <Col ><p className="fw-medium"> Booking schedules</p></Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <div className="d-flex">
                                <Col xs={3}>
                                    <Form.Label >Facility type <span className="text-danger"> *</span></Form.Label>
                                    <Form.Select value={data.Facility} className="form-control mt-2" name="Facility" onChange={(e) => handleChange(e)} >
                                        {Facility.map((Facility) => {
                                            return <option value={Facility}>{Facility}</option>;
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col xs={3}>
                                    <Form.Label className="mx-5">Facilities <span className="text-danger"> *</span></Form.Label>
                                    <Form.Select value={Facilitie} className="form-control mt-2 w-75 mx-5" name="Facilitie" onChange={(e) => handleChange(e)} >
                                        {Facilitie.map((Facilitie) => {
                                            return <option value={Facilitie}>{Facilitie}</option>;
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="mx-4">Date </Form.Label>
                                        <Form.Control type="date" className="mt-2 w-75 mx-4" name="date" value={data.date} onChange={(e) => handleChange(e)} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Button className="d-block w-75 mt-2 "><Icon icon="material-symbols:search" /><span>Search</span></Button>
                                </Col>
                                <Col>
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Button className="d-block w-100 mt-2" variant="danger" onClick={handleShow} ><span  >Add a Booking</span></Button>
                                </Col>
                            </div>
                        </Row>
                        <hr></hr>
                        <div>
                            <Row>
                                <Col>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="secondary">Today</Button>
                                        <Button variant="secondary">Back</Button>
                                        <Button variant="secondary">Next</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col className="text-center"><p>Monday Jan 29</p></Col>
                                <Col className="text-end ">
                                    <ButtonGroup aria-label="Basic example" >
                                        <Button variant="danger">Day</Button>
                                        <Button variant="secondary">Week</Button>
                                        <Button variant="secondary">Month</Button>
                                    </ButtonGroup>
                                </Col>
                                <Moment format="ddd" />

                            </Row>
                            <div className="col-12">
                                <Offcanvas show={show} onHide={handleClose} className=" w-75" placement="end"  >
                                    <Offcanvas.Header closeButton className="bg-light">
                                        <Offcanvas.Title ><p className="fw-medium">Booking</p></Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Container>
                                            <Row>
                                                <Col xs={8}>
                                                    <Row>
                                                        <Col >
                                                            <Form.Label><span className="fw-medium">Booking Type <span className="text-danger">*</span></span></Form.Label>
                                                            <Form.Select value={data.Booking} className="form-control mt-2 w-100" name="Booking" onChange={(e) => handleChange(e)}>
                                                                {Booking.map((Booking) => {
                                                                    return <option value={Booking}>{Booking}</option>
                                                                })
                                                                }
                                                            </Form.Select>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label><span className="fw-medium ">Facility Type <span className="text-danger">*</span></span></Form.Label>
                                                            <Form.Select value={data.Facility} className="form-control mt-2 w-100" name="Facility" onChange={(e) => handleChange(e)} >
                                                                {Facility.map((Facility) => {
                                                                    return <option value={Facility}>{Facility}</option>;
                                                                })}
                                                            </Form.Select>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p className="fw-medium mt-2">Booking occurrence</p>
                                                            <Form.Check
                                                                inline
                                                                label="Single booking"
                                                                name="Bookingtype"
                                                                value="Single booking"
                                                                type="radio"
                                                                id={`inline-1`}
                                                                onChange={(e) => handleBookingTypeChange(e)}

                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Multiple booking"
                                                                name="Bookingtype"
                                                                value="Multiple booking"
                                                                type="radio"
                                                                id={`inline-2`}
                                                                onChange={(e) => handleBookingTypeChange(e)}
                                                            />
                                                        </Col>
                                                        {showFrequency && (
                                                            <Col>
                                                                <Form.Label>Frequency</Form.Label>
                                                                <Form.Select name="frequency" value={data.week} onChange={handleChange}>
                                                                    <option value="Weekly">{weeks}</option>
                                                                </Form.Select>
                                                            </Col>
                                                        )}
                                                    </Row>
                                                    <Row>
                                                        <Col xs={3}><Form.Label className="fw-medium mt-3">Start Date <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                onChange={(e) => handleStartDateChange(e)}
                                                                name="startdate"
                                                                value={timevalue.startdate}
                                                                min="2024-02-01"
                                                            />
                                                        </Col>
                                                        <Col> <Form.Label className="fw-medium mt-3">End Date <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="enddate"
                                                                value={bookingType === "Single booking" ? timevalue.startdate : timeset.enddate}
                                                                disabled={bookingType === "Single booking"}
                                                                onChange={(e) => handleEndDateChange(e)}
                                                            /></Col>
                                                        <Col><Form.Label className="fw-medium mt-3">Start Time <span className="text-danger">*</span></Form.Label>
                                                            <Form.Select type="text" onChange={(e) => handleChange(e)} name="starttime"><Icon icon="carbon:time" />
                                                                {time.map((time) => {
                                                                    return (

                                                                        <option disabled={timevalue === ''} value={time}>{time} </option>
                                                                    )
                                                                })
                                                                }
                                                            </Form.Select></Col>
                                                        <Col><Form.Label className="fw-medium mt-3"   >End Time <span className="text-danger">*</span></Form.Label>
                                                            <Form.Select type="text" onChange={(e) => handleChange(e)} name="endtime"  >
                                                                {time.map((time) => {
                                                                    return (

                                                                        <option disabled={timevalue === ''} value={time}>{time}<Icon icon="carbon:time" /></option>
                                                                    )
                                                                })
                                                                }
                                                            </Form.Select></Col>
                                                    </Row>
                                                    <p className="fs-5 mt-2 fw-medium">Select</p>
                                                    {FrequencyWeeks && (
                                                        day.map((day) => {
                                                            return (
                                                                <Form.Check
                                                                    inline
                                                                    label={day}
                                                                    value={day}
                                                                    onClick={(e) => handleChange(e)}
                                                                    disabled={bookingType === "Single booking"}
                                                                // hidden={bookingType === "Single booking"}
                                                                />
                                                            )
                                                        })
                                                    )

                                                    }

                                                    <Col className="mt-4">
                                                        <Button variant="danger" className="mt-3">Check avaliabilty</Button>
                                                    </Col>
                                                    <Col>
                                                        <Form.Label className="fw-medium fs-5 mt-3">Notes</Form.Label>
                                                        <FloatingLabel controlId="floatingTextarea2" label="Leave a comment here" className="mt-3">
                                                            <Form.Control
                                                                as="textarea"
                                                                placeholder="Leave a comment here"
                                                                style={{ height: '100px' }}
                                                                name="Notes"
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </FloatingLabel>
                                                    </Col>
                                                </Col>
                                                <Col className="border border-2">
                                                    <span className="fs-5">Booking Type</span>
                                                    <p className="fw-medium mt-3 ">{data.Booking}</p>
                                                    <hr></hr>
                                                    <div>
                                                        <p >Start date and time</p>
                                                        <p className="fw-medium">{timevalue.startdate} {data.starttime}</p>
                                                        <p >End date and time</p>
                                                        <p className="fw-medium" >{timeset.enddate} {data.endtime}</p>
                                                        <hr></hr>
                                                    </div>
                                                    <div>
                                                        <p className="fs-5">Facility type</p>
                                                        <p className="fw-medium ">{data.Facility}</p>
                                                        <hr></hr>
                                                    </div>
                                                    <div>
                                                        <p className="fs-5 fw-medium">Player's Facility and pricing details </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Offcanvas.Body>
                                    <div className="bg-light p-3 text-end"><Button variant="danger ">Proceed to book</Button></div>
                                </Offcanvas>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row >
        </Container >
    )
}
export default Reservation;