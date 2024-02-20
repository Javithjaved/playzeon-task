import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, FloatingLabel, Form, Offcanvas, Row } from "react-bootstrap";
import { Facilitytype, Facilities, BookingType, FrequencyWeeks, time, days } from '../utils/data.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import { format, eachDayOfInterval, getDay } from 'date-fns';
import axios from "axios";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import enUS from 'date-fns/locale/en-US';
import ReservationTable from "../components/Table.tsx";
import DigitalClock from "../components/DigitalClock.tsx";
import moment from 'moment';
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
    showSelect: string;
    setShowSelect: React.Dispatch<React.SetStateAction<string[]>>;
    playerData: string;
    setPlayerData: React.Dispatch<React.SetStateAction<string[]>>
}
const Reservation: React.FC<userData> = ({ data, setData, bookingType, setBookingType, showFrequency, setShowFrequency, timevalue, setTimeValue, timeset, settimeSet, showSelect, setShowSelect, playerData, setPlayerData }) => {

    const Booking = BookingType;
    const weeks = FrequencyWeeks;
    const baseurl = process.env.REACT_APP_BASEURL;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [userdata, setUserDate] = useState([])
    const [users, setuser] = useState({ userdata });
    const daysOfWeek = days;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleBookingTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookingType(e.target.value);
        if (e.target.value === "false") {
            setShowFrequency(false);
            setShowSelect(false);
        }
        else {
            setShowFrequency(true);
            setShow(true);
        }
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startDateValue = e.target.value;
        setTimeValue({ ...timevalue, startdate: startDateValue });
        setStartDate(new Date(e.target.value));
        if (bookingType === "false") {
            settimeSet({ ...timeset, enddate: startDateValue });
        }
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        settimeSet({ ...timeset, enddate: e.target.value });
        setEndDate(new Date(e.target.value));
    }
    const handleStartTime = () => {

    }
    const [startTimevalue, setStartTimeValue] = useState();
    const [endTimeValue, setTimevalue] = useState();
    const [showForm, setShowForm] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [playerShow, setPlayerShow] = useState(false);
    const handleClosePlayer = () => setPlayerShow(false);
    const handleShowPlayer = () => setPlayerShow(true);
    const [facilitiesListData, setFacilitiesListData] = useState([]);
    const [useid, setUseId] = useState<null>(null);
    const [facilitiesdata, setFacilitiesdata] = useState();
    const renderDaysOfWeek = (startDate: never, endDate: never) => {
        const daysBetween = eachDayOfInterval({ start: startDate, end: endDate });
        const dayCounts = {};
        daysBetween.forEach(day => {
            const dayIndex = getDay(day);
            const dayOfWeek = daysOfWeek[dayIndex];
            if (!dayCounts[dayOfWeek]) {
                dayCounts[dayOfWeek] = 1;
            } else {
                dayCounts[dayOfWeek]++;
            }
        });
        return (
            <div className="d-flex">
                {Object.keys(dayCounts).map(day => (
                    <Form.Check
                        inline
                        label={day}
                        value={day}
                        name="day"
                        onChange={(e) => handleCheck(e)}
                    />
                ))}
            </div>
        );

    };
    const [centerId, setCenterId] = useState("");
    const [sportIds, setSportIds] = useState<number | null>(null)
    const [usersportid, setUserSportid] = useState();
    const [check, setCheck] = useState('');
    const [availablefacility, setAvailableFacility] = useState([]);
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheck({ ...check, [e.target.name]: e.target.value });

    }
    const fetchOrganization = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/v1/centers?organizationId.equals=${useid}`);
            const orgData = response.data;
            const centerTitles = orgData.map((center: { title: string; }) => center.title);
            console.log(centerTitles);
            const orgSportId = orgData.sportId;
            setSportIds(orgSportId);
        } catch (error) {
            console.error("Error fetching organization data:", error);
        }
    };
    const Reservationfacilitytype = () => {
        axios({
            method: "get",
            url: `${baseurl}/api/v1/sport-photos`,
        })
            .then(res => {
                const sports = res.data;
                setUserDate(sports);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // const facilitiesCenter = () => {
    //     axios({
    //         method: "get",
    //         url: `${baseurl}/api/v1/facilities?sportId.equals=1&centerId.equals=${centerId}`,
    //     })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    const centerid = () => {
        axios({
            method: "get",
            url: `${baseurl}/api/v1/centers/${useid}`,
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const fetchFacilityTypes = (e: React.ChangeEvent<HTMLSelectElement> | undefined) => {
        axios.get(`${baseurl}/api/v1/facilityList?sportId.equals=${e.target.value}&centerId.equals=${useid}`)
            .then(response => {
                setUserSportid(e?.target.value);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching facility types:", error);
            });
    };
    const fetchFacilities = (e) => {
        axios.get(`${baseurl}/api/v1/facilities?sportId.equals=${e.target.value}&centerId.equals=${centerId}`)
            .then(response => {
                const facilitiesData = response.data["Tennis court"].map((facility) => facility.name);
                setFacilitiesListData(facilitiesData);
            })
            .catch(error => {
                console.error("Error fetching facilities:", error);
            });
    };
    // const fetchFacilities = (e: React.MouseEvent<HTMLSelectElement, MouseEvent> | undefined) => {
    //     axios.get(`${baseurl}/api/v1/facilities?sportId.equals=${e.target.value}&centerId.equals=${useid}`)
    //         .then(response => {
    //             console.log(response.data);
    //             const facilitiesData = response.data;

    //         })
    //         .catch(error => {
    //             console.error("Error fetching facilities:", error);
    //         });
    // };

    const account = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/account`);
            const authorities = response.data.authorities;
            localStorage.getItem('authorities', JSON.stringify(authorities));
            const useidResponse = response.data.orgId;
            const centerid = response.data.centerId;
            setCenterId(centerid);
            setUseId(useidResponse);
        } catch (err) {
            console.log(err);
        }
    };
    const Check = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        axios({
            method: "get",
            url: `${baseurl}/api/v1/facility/getAvailability?centerId.equals=69651&sportId.equals=${usersportid}&startTime=${StartDate}&endTime=${EndDate}&isMultiple=${bookingType}&days=${check}`,
        })
            .then(res => {
                // Map the response data to rename the 'title' field to 'name' dynamically
                const mappedData = res.data.map((item: { title: any; }) => {
                    return {
                        ...item,
                        name: item.title
                    };
                });

                console.log(mappedData);
                setAvailableFacility(mappedData);
                setShowForm(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            await account();
            if (centerId) {
                Reservationfacilitytype();
                centerid();
            }
        };
        fetchData();
    }, [centerId]);

    useEffect(() => {
        async function fetchData() {
            if (useid) {
                await fetchOrganization();
            }
        }
        fetchData();
    }, [useid]);

    useEffect(() => {
        if (sportIds && centerId) {
            fetchFacilityTypes();
            fetchFacilities();
        }
    }, [sportIds]);

    const locales = {
        'en-US': enUS,
    }
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })
    // const [playerData, setPlayerData] = useState({
    //     FirstName: "",
    //     LastName: "",
    //     Mobile: "",
    //     EmailAddress: "",
    // })
    const handleChangePlayerData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPlayerData({ ...playerData, [e.target.name]: e.target.value });

    }
    const handleSubmitplayerlist = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(playerData);
    }
    const formattedStartDate = moment(`${timevalue.startdate} ${data.starttime}`).format("MMMM D, YYYY h:mm  A ");
    const formattedEndDate = moment(timeset.enddate).format("MMMM D, YYYY h:mm  A  ");
    const StartDate = moment.utc(`${timevalue.startdate} ${data.starttime}`).format();
    const EndDate = moment.utc(`${timeset.enddate} ${data.endtime}`).format();
    console.log(StartDate);
    console.log(EndDate);
    const pricingrule = () => {
        axios({
            method: "get",
            url: ` ${baseurl}/api/v1/pricing-rules?centerId=69651&facilityIds=69452`
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Container>
            <Row>
                <Col xs={12} className="backgroundcolor overflow-hidden">

                    <div className="bg-white rounded-3 p-2">
                        <Row >
                            <Col xs={8} md={9} className="d-md-flex justify-content-between " >
                                <div className="me-sm-3"> <Icon icon="akar-icons:box" className="iconcolor me-1 " /> <span>Player/Not Paid</span></div>
                                <div className="me-sm-3"><Icon icon="akar-icons:box" className="iconcoach me-1" /><span>Coach</span></div>
                                <div className="me-sm-3"><Icon icon="akar-icons:box" className="iconadmin me-1" /><span>Admin</span></div>
                                <div className="me-sm-3"><Icon icon="akar-icons:box" className="iconmaintenance me-1" /><span>Maintenance</span></div>
                                <div className="me-sm-3"><Icon icon="akar-icons:box" className="icontournament me-1" /><span>Tournament</span></div>
                                <div className="me-sm-3"><Icon icon="akar-icons:box" className="iconPlayer me-1" /><span>Player/Paid</span></div></Col>
                            <Col xs={4} md={3} ><p className="fw-medium text-end me-3 "> Booking schedules</p></Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <div className="d-md-flex">
                                <Col md={2} lg={2} xl={3}>
                                    <Form.Label>Facility type <span className="text-danger"> *</span></Form.Label>
                                    <Form.Select className="form-control mt-2" name="Facility" onChange={(e) => fetchFacilityTypes(e)} onClick={(e) => fetchFacilities(e)} >
                                        {userdata.map((title, index) => {
                                            return (
                                                <option key={index} value={title.sport.id}  >{title.title}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col md={2} lg={2} xl={3} className="ms-lg-2 ms-md-2">
                                    <Form.Label>Facilities <span className="text-danger"> *</span></Form.Label>
                                    <Form.Select className="form-control mt-2 ms-md-2 mx-0" name="Facilitie" onChange={(e) => handleChange(e)} >
                                        {facilitiesListData.map((facility, index) => (
                                            <option key={index} value={facility.id}>{facility.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={2} lg={2} xl={2} className="mt-2 ms-lg-4 ms-md-4 mt-2 ms-lg-4 ms-md-4 ">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Date </Form.Label>
                                        <Form.Control type="date" name="date" value={data.date} onChange={(e) => handleChange(e)} />
                                    </Form.Group>
                                </Col>
                                <div className="w-100">
                                    <Row>
                                        <Col >
                                            <Form.Label className="mt-1">&nbsp;</Form.Label>
                                            <Button className="d-block  p-lg-2 ms-md-2 w-md-50 w-lg-50 "><Icon icon="material-symbols:search" /><span>Search</span></Button>
                                        </Col>
                                        <Col   >
                                            <Form.Label className="mt-1">&nbsp;</Form.Label>
                                            <Button className="d-block  w-md-50 w-lg-50 " variant="danger" onClick={handleShow} ><span >Add a Booking</span></Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Row>
                        <hr></hr>
                        <div>
                            <Row>
                                <Calendar
                                    localizer={localizer}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                />
                            </Row>
                            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                <Offcanvas show={show} onHide={handleClose} className=" w-75 " placement="end"  >
                                    <Offcanvas.Header closeButton className="bg-light">
                                        <Offcanvas.Title ><p className="fw-medium">Booking</p></Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Container fluid className="p-0">
                                            <Row>
                                                <Col lg={8} md={8} >
                                                    <Row>
                                                        <Col lg={6} md={6} >
                                                            <Form.Label><span className="fw-medium ">Booking Type <span className="text-danger">*</span></span></Form.Label>
                                                            <Form.Select value={data.Booking} className="form-control mt-2  " name="Booking" onChange={(e) => handleChange(e)}>
                                                                {Booking.map((Booking) => {
                                                                    return <option value={Booking}>{Booking}</option>
                                                                })
                                                                }
                                                            </Form.Select>
                                                        </Col>
                                                        <Col lg={6} md={6}>
                                                            <Form.Label><span className="fw-medium ">Facility Type <span className="text-danger">*</span></span></Form.Label>
                                                            <Form.Select className="form-control mt-2" name="Facility" onChange={(e) => fetchFacilityTypes(e)} onClick={(e) => fetchFacilities(e)} >
                                                                {userdata.map((title, index) => {
                                                                    return (

                                                                        <option key={index} value={title.sport.id}   >{title.title}</option>
                                                                    )
                                                                })}
                                                            </Form.Select>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6} md={6}>
                                                            <p className="fw-medium mt-2">Booking occurrence</p>
                                                            <Form.Check
                                                                inline
                                                                label="Single booking"
                                                                name="Bookingtype"
                                                                value="false"
                                                                type="radio"
                                                                onChange={(e) => handleBookingTypeChange(e)}
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Multiple booking"
                                                                name="Bookingtype"
                                                                value="ture"
                                                                type="radio"
                                                                onChange={(e) => handleBookingTypeChange(e)}
                                                            />
                                                        </Col>
                                                        <Col lg={6} md={6}>
                                                            {showFrequency && (
                                                                <Col>
                                                                    <Form.Label>Frequency</Form.Label>
                                                                    <Form.Select name="frequency" value={data.week} onChange={handleChange}>
                                                                        <option value="Weekly">{weeks}</option>
                                                                    </Form.Select>
                                                                </Col>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={3} md={3}><Form.Label className="fw-medium mt-3">Start Date <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                onChange={(e) => handleStartDateChange(e)}
                                                                name="startdate"
                                                                value={timevalue.startdate}
                                                                min="2024-02-08"
                                                            />
                                                        </Col>
                                                        <Col lg={3} md={3}> <Form.Label className="fw-medium mt-3">End Date <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="enddate"
                                                                value={bookingType === "Single booking" ? timevalue.startdate : timeset.enddate}
                                                                disabled={bookingType === "Single booking"}
                                                                onChange={(e) => handleEndDateChange(e)}
                                                            /></Col>
                                                        {/* <Form.Select type="text" onChange={(e) => handleChange(e)} name="starttime" placeholder="Username" ><Icon icon="carbon:time" />
                                                                {time.map((time) => {
                                                                    return (
                                                                        <option disabled={timevalue === ''} value={time}>{time} </option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Select> */}
                                                        {/* <Form.Select type="text" onChange={(e) => handleChange(e)} name="endtime"  >
                                                                {time.map((time) => {
                                                                    return (
                                                                        <option disabled={timevalue === ''} value={time}>{time}<Icon icon="carbon:time" /></option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Select> */}
                                                        <Col lg={3} md={3}><Form.Label className="fw-medium mt-3">Start Time <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control type="time" onChange={(e) => handleChange(e)} name="starttime" disabled={timevalue === ''}></Form.Control>
                                                        </Col>
                                                        <Col lg={3} md={3}><Form.Label className="fw-medium mt-3"   >End Time <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control type="time" onChange={(e) => handleChange(e)} name="endtime" disabled={timevalue == ''}></Form.Control>
                                                        </Col>
                                                    </Row>
                                                    {startDate && endDate && showFrequency && (
                                                        <div>
                                                            <span>Select </span>
                                                            <p >{renderDaysOfWeek(startDate, endDate)}</p>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <Col className="mt-4">
                                                            <Button variant="danger" disabled={timevalue === ""} className="mt-3" onClick={(e) => Check(e)}>Check avaliabilty</Button>
                                                        </Col>
                                                        <div>
                                                            <p className="mt-2">Available facility</p>
                                                            {availablefacility.map((facility, index) => (
                                                                <Badge key={index} bg="success">{facility.title}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* <div>
                                                        <p className="fw-medium mt-3 fs-5">Player Details </p>
                                                        <Row>
                                                            <Col lg={6}>
                                                                <Form.Label >First name</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    onChange={(e) => handleChangePlayerData(e)}
                                                                    name="FirstName"
                                                                    value={playerData.FirstName}
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Label>Last name</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    onChange={(e) => handleChangePlayerData(e)}
                                                                    name="LastName"
                                                                    value={playerData.LastName}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={6}>
                                                                <Form.Label htmlFor="inputPassword5">Mobile no </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    onChange={(e) => handleChangePlayerData(e)}
                                                                    name="Mobile"
                                                                    value={playerData.Mobile}
                                                                />
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Label htmlFor="inputPassword5">Email address</Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    onChange={(e) => handleChangePlayerData(e)}
                                                                    name="EmailAddress"
                                                                    value={playerData.EmailAddress}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <div className="mt-3 float-end mb-2">
                                                            <Button variant="success" onClick={(e) => handleSubmitplayerlist(e)}>save</Button>
                                                        </div>
                                                    </div> */}
                                                    {showForm && (
                                                        <div>
                                                            <p className="fw-medium mt-3 fs-5">Player Details </p>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <Form.Label>First name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        onChange={(e) => handleChangePlayerData(e)}
                                                                        name="FirstName"
                                                                        value={playerData.FirstName}
                                                                    />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Form.Label>Last name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        onChange={(e) => handleChangePlayerData(e)}
                                                                        name="LastName"
                                                                        value={playerData.LastName}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <Form.Label htmlFor="inputPassword5">Mobile no </Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        onChange={(e) => handleChangePlayerData(e)}
                                                                        name="Mobile"
                                                                        value={playerData.Mobile}
                                                                    />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Form.Label htmlFor="inputPassword5">Email address</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        onChange={(e) => handleChangePlayerData(e)}
                                                                        name="EmailAddress"
                                                                        value={playerData.EmailAddress}
                                                                    />
                                                                </Col>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Label>Facility <span className="text-danger">*</span></Form.Label>
                                                                        <div className="border h-100  ">
                                                                            {availablefacility.map((facility, index) => (
                                                                                <div key={index} className="form-check mt-2">
                                                                                    <input
                                                                                        className="form-check-input"
                                                                                        type="radio"
                                                                                        name="facilityRadio"
                                                                                        id={`facilityRadio${index}`}
                                                                                        value={facility.title}
                                                                                        onClick={()=>pricingrule()}
                                                                                    />
                                                                                    <label className="form-check-label" >
                                                                                        {facility.title}
                                                                                    </label>
                                                                                </div>
                                                                            ))}
                                                                        </div>

                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label>Pricing rule <span className="text-danger">*</span></Form.Label>
                                                                    </Col>
                                                                </Row>
                                                            </Row>
                                                            <div className="mt-3 float-end mb-2">
                                                                <Button variant="success" onClick={(e) => handleSubmitplayerlist(e)}>Save</Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="mt-5">
                                                        <Button variant="danger" onClick={handleShowPlayer}>Add Player</Button>
                                                    </div>
                                                    <div>
                                                        <p className="mt-3 fw-medium">Add player's</p>
                                                    </div>
                                                    <ReservationTable />
                                                    <Col >
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
                                                        <p className="fw-medium">{formattedStartDate}  {data.starttime}</p>
                                                        <p >End date and time</p>
                                                        <p className="fw-medium" >{formattedEndDate} {data.endtime} </p>
                                                        <hr></hr>
                                                    </div>
                                                    <div>
                                                        <p className="fs-5">Facility type</p>
                                                        <p className="fw-medium ">{data.Facility}</p>
                                                        <hr></hr>
                                                    </div>
                                                    <div>
                                                        <p className="fs-5 fw-medium">Player's Facility and pricing details </p>
                                                        <ReservationTable />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Offcanvas.Body>
                                    <div className="bg-light p-3 text-end"><Button variant="danger ">Proceed to book</Button></div>
                                </Offcanvas>
                                <Offcanvas show={playerShow} onHide={handleClosePlayer} placement="end">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>Add Player</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Form.Check
                                            label={"Name not disclosed"}
                                        />
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Label className="mt-3">First Name </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => handleChangePlayerData(e)}
                                                    name="Mobile"
                                                    value={playerData.Mobile}
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Label className="mt-3">Last Name</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    onChange={(e) => handleChangePlayerData(e)}
                                                    name="EmailAddress"
                                                    value={playerData.EmailAddress}
                                                />
                                            </Col>

                                        </Row>
                                        <Form.Check
                                            className="mt-3"
                                            label={"Same as primary"}
                                        />
                                        <Row>
                                            <Col>
                                                <Form.Label>Facility <span className="text-danger ">*</span></Form.Label>
                                                <div>

                                                </div>
                                            </Col>
                                            <Col>
                                                <Form.Label>Pricing rule <span className="text-danger">*</span></Form.Label>
                                                <div>

                                                </div>
                                            </Col>
                                            <Button variant="success  mt-2">Add</Button>
                                            <Button variant="danger mt-2" >Close</Button>
                                        </Row>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                        </div>
                    </div>
                </Col >
            </Row >
        </Container >
    )
}
export default Reservation;

