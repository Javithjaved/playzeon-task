import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Col, Container, FloatingLabel, Form, InputGroup, Offcanvas, Row } from "react-bootstrap";
import { Facilitytype, Facilities, BookingType, FrequencyWeeks, time, days } from '../utils/data.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import { format, eachDayOfInterval, getDay } from 'date-fns';
import axios from "axios";
import { Calendar, Navigate, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import enUS from 'date-fns/locale/en-US';
import ReservationTable from "../components/Table.tsx";
import moment from 'moment';
import PlayerTable from "../components/PlayerTable.tsx";
import photo from "../asset/image/logo.png";
import { userdate } from "../Context/Context.tsx";
import * as formik from 'formik';
import * as yup from 'yup';
import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils/index";
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
    const { Formik } = formik;
    const { setFacilitylist, setPricingRule, setPricingCost, facilitylist } = useContext(userdate);
    const Booking = BookingType;
    const weeks = FrequencyWeeks;
    const baseurl = process.env.REACT_APP_BASEURL;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [userdata, setUserDate] = useState([])
    const daysOfWeek = days;
    const [pricingRules, setPricingRules] = useState([]);
    const centerids = localStorage.getItem("CurrentCenterId");
    const [Bookingshow, setBookingShow] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [tableShow, setTableShow] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [playerShow, setPlayerShow] = useState(false);
    const handleClosePlayer = () => setPlayerShow(false);
    const handleShowPlayer = () => setPlayerShow(true);
    const [facilitiesListData, setFacilitiesListData] = useState([]);
    const [useid, setUseId] = useState<null>(null);
    const [sportsData, setSportsData] = useState([]);
    const [daysCheck, setDaysCheck] = useState([]);
    const [sportIds, setSportIds] = useState<number | null>(null)
    const [usersportid, setUserSportid] = useState();
    const [check, setCheck] = useState();
    const [availablefacility, setAvailableFacility] = useState([]);
    const [facilitiesId, setFacilitiesId] = useState([]);
    const [formatdaysValue, setFormatDaysValue] = useState();
    // const schema = yup.object().shape({
    //     FirstName: yup.string().required("First Name is a required field"),
    //     LastName: yup.string().required("Last Name is a required field"),
    //     Mobile: yup.number().required("Mobile is a required field"),
    //     EmailAddress: yup.string().required("Email Address is a required field"),
    // })
    const schema = yup.object().shape({
        FirstName: yup.string().required(),
        LastName: yup.string().required(),
        Mobile: yup.number().required(),
        EmailAddress: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleBookingClose = () => setBookingShow(false);
    const handleBookingShow = () => {
        setBookingShow(true);
    }
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
    const handlefacilitychange = (e) => {
        setFacilitylist(e.target.value);


    }
    const handleChangeRule = (e: React.ChangeEvent<HTMLInputElement>, rule: never) => {
        setPricingRule(e.target.value)
        setPricingCost(rule.pricingRule.cost)
    }

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
    const renderDaysOfWeek = (startDate, endDate) => {
        const daysBetween = eachDayOfInterval({ start: startDate, end: endDate });
        const dayCounts = {};
        daysBetween.forEach(day => {
            const dayIndex = getDay(day);
            const dayOfWeek = days[dayIndex];
            if (!dayCounts[dayOfWeek]) {
                dayCounts[dayOfWeek] = 0;
            } else {
                dayCounts[dayOfWeek]++;
            }
        });
        return (
            <div className="d-flex">
                {Object.keys(dayCounts).map(day => (
                    <Form.Check
                        key={day}
                        inline
                        label={day}
                        value={day}
                        name="day"
                        onChange={(e) => handleCheck(e)}
                        checked={daysCheck.includes(day)}
                    />
                ))}
            </div>
        );
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkedValue = e.target.value;
        if (daysCheck.includes(checkedValue)) {
            const updatedDays = daysCheck.filter(day => day !== checkedValue);
            setDaysCheck(updatedDays);
        } else {
            setDaysCheck([...daysCheck, checkedValue]);
        }
    };

    const formattedDays = daysCheck.map(day => moment().day(day).format('dddd'));

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
    const centerid = () => {
        axios({
            method: "get",
            url: `${baseurl}/api/v1/centers/${centerids}`,
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const fetchFacilityTypes = (e: React.ChangeEvent<HTMLSelectElement> | undefined) => {
        axios.get(`${baseurl}/api/v1/facilityList?sportId.equals=${e.target.value}&centerId.equals=${centerids}`)
            .then(response => {
                setUserSportid(e?.target.value);
                setSelectedFacility(e?.target.value)
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching facility types:", error);
            });
    };
    const fetchFacilities = (e: React.MouseEvent<HTMLSelectElement, MouseEvent> | undefined) => {
        axios.get(`${baseurl}/api/v1/facilities?sportId.equals=${e.target.value}&centerId.equals=${centerids}`)
            .then(response => {
                const facilitiesData = response.data["Tennis court"].map((facility) => facility.name);
                setFacilitiesListData(facilitiesData);
            })
            .catch(error => {
                console.error("Error fetching facilities:", error);
            });
    };
    const account = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/account`);
            const authorities = response.data.authorities;
            localStorage.getItem('authorities', JSON.stringify(authorities));
        } catch (err) {
            console.log(err);
        }
    };
    const Check = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        axios({
            method: "get",
            url: `${baseurl}/api/v1/facility/getAvailability?centerId.equals=${centerids}&sportId.equals=${usersportid}&startTime=${StartDate}&endTime=${EndDate}&isMultiple=${bookingType}&days=${formattedDays}`,
        })
            .then(res => {
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
            }); localStorage.getItem("orgId")
    }


    useEffect(() => {
        const fetchData = async () => {
            await account();
            if (centerids) {
                Reservationfacilitytype();
                centerid();
            }
        };
        fetchData(); localStorage.getItem("orgId")
    }, [centerids]);

    useEffect(() => {
        async function fetchData() {
            localStorage.getItem("orgId")
            if (useid) {
                await fetchOrganization();
            }
        } localStorage.getItem("orgId")
        fetchData();
    }, [useid]);

    useEffect(() => {
        if (sportIds && centerids) {
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

    const handleChangePlayerData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPlayerData({ ...playerData, [e.target.name]: e.target.value });

    }
    const handleSubmitplayerlist = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTableShow(!tableShow);
    }
    const formattedStartDate = moment(`${timevalue.startdate} ${data.starttime}`).format("MMMM D, YYYY h:mm  A ");
    const formattedEndDate = moment(`${timeset.enddate} ${data.endtime}`).format("MMMM D, YYYY h:mm  A  ");
    const StartDate = moment.utc(`${timevalue.startdate} ${data.starttime}`).format();
    const EndDate = moment.utc(`${timeset.enddate} ${data.endtime}`).format();
    console.log(StartDate);
    console.log(EndDate);
    const pricingrule = (facilitiesId) => {
        axios({
            method: "get",
            url: `${baseurl}/api/v1/pricing-rules?centerId=${centerids}&facilityIds=${facilitiesId}`
        })
            .then(res => {
                console.log(res);
                setPricingRules(res.data);
                const mappedData = res.data.map(item => {
                    return {
                        ...item,
                        facilityId: item.facility.id
                    };
                });

                console.log(mappedData);
                setFacilitiesId(mappedData);
            })
            .catch(err => {
                console.log(err);
            });
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
                                                                value="true"
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
                                                        <Col lg={3} md={3}><Form.Label className="fw-medium mt-3">Start Time <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control type="time" onChange={(e) => handleChange(e)} name="starttime" disabled={timevalue === ''}></Form.Control>
                                                        </Col>
                                                        <Col lg={3} md={3}><Form.Label className="fw-medium mt-3"   >End Time <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control type="time" onChange={(e) => handleChange(e)} name="endtime" disabled={timevalue == ''}></Form.Control>
                                                        </Col>
                                                    </Row>
                                                    {startDate && endDate && showFrequency && (
                                                        <div>
                                                            <p className="fs-5">Select </p>
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
                                                                <Badge key={index} bg="success" className="p-2 me-2"><p className="p-2 mb-0">{facility.title}</p></Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {showForm && (
                                                            <div>
                                                                <p className="fw-medium mt-3 fs-5">Player Details </p>
                                                                <Formik
                                                                    validationSchema={schema}
                                                                    //  onSubmit={console.log(values)}
                                                                    initialValues={{
                                                                        FirstName: '',
                                                                        LastName: '',
                                                                        Mobile: '',
                                                                        EmailAddress: '',
                                                                        titel: '',
                                                                    }}
                                                                >
                                                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                                                        <Form noValidate onSubmit={handleSubmit}>

                                                                            <Row>
                                                                                <Col lg={6}>
                                                                                    <Form.Label>First name</Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        onChange={handleChange}
                                                                                        name="FirstName"
                                                                                        value={values.FirstName}
                                                                                        isInvalid={!!errors.FirstName}

                                                                                    />
                                                                                </Col>
                                                                                <Col lg={6}>
                                                                                    <Form.Label>Last name</Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        onChange={handleChange}
                                                                                        name="LastName"
                                                                                        value={values.LastName}
                                                                                        isInvalid={!!errors.LastName}
                                                                                    />
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col lg={6}>
                                                                                    <Form.Label >Mobile no </Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        onChange={handleChange}
                                                                                        name="Mobile"
                                                                                        value={values.Mobile}
                                                                                        isInvalid={!!errors.Mobile}
                                                                                    />
                                                                                </Col>
                                                                                <Col lg={6}>
                                                                                    <Form.Label >Email address</Form.Label>
                                                                                    <Form.Control
                                                                                        type="email"
                                                                                        onChange={handleChange}
                                                                                        name="EmailAddress"
                                                                                        value={values.EmailAddress}
                                                                                        isInvalid={!!errors.EmailAddress}
                                                                                    />
                                                                                </Col>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <Form.Label>Facility <span className="text-danger">*</span></Form.Label>
                                                                                        <div className="border h-100 p-2  ">
                                                                                            {availablefacility.map((facility, index) => (
                                                                                                <div key={index} className="form-check mt-2">
                                                                                                    <Form.Control
                                                                                                        className="form-check-input"
                                                                                                        type="radio"
                                                                                                        name="facilityRadio"
                                                                                                        id={`facilityRadio${index}`}
                                                                                                        value={facility.title && values.title}
                                                                                                        onClick={() => pricingrule(facility.id)}
                                                                                                        // onChange={handlefacilitychange}
                                                                                                        isInvalid={!!errors.titel}
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
                                                                                        <div className="border h-100vh p-2">
                                                                                            {pricingRules.map((rule, index) => (
                                                                                                <div key={index} >
                                                                                                    <Form.Control
                                                                                                        type="radio"
                                                                                                        name="pricingRule"
                                                                                                        value={rule.pricingRule.ruleName}
                                                                                                        onChange={(e) => handleChangeRule(e, rule)}
                                                                                                        onClick={handleChange}
                                                                                                    />
                                                                                                    <label>
                                                                                                        {rule.pricingRule.ruleName}
                                                                                                    </label>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Row>
                                                                            <div className="mt-3 float-end mb-2">
                                                                                <Button variant="success" type="submit">Save</Button>
                                                                            </div>
                                                                        </Form>
                                                                    )}
                                                                </Formik>


                                                            </div>
                                                        )}
                                                    </div>


                                                    <div className="mt-5">
                                                        <Button variant="danger" onClick={handleShowPlayer}>Add Player</Button>
                                                    </div>
                                                    <div>
                                                        <p className="mt-3 fw-medium">Add player's</p>
                                                    </div>

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
                                                        <p className="fw-medium">{formattedStartDate} </p>
                                                        <p >End date and time</p>
                                                        <p className="fw-medium" >{formattedEndDate}</p>
                                                        <hr></hr>
                                                    </div>
                                                    <div>
                                                        <p className="fs-5">Facility type</p>
                                                        <p className="fw-medium ">{data.Facility}</p>
                                                        <hr></hr>
                                                    </div>
                                                    <div >
                                                        <p className="fs-5 fw-medium">Player's Facility and pricing details </p>
                                                        <div>
                                                            {tableShow &&
                                                                <ReservationTable />
                                                            }
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>

                                    </Offcanvas.Body>

                                    <div className="bg-light p-3 text-end"><Button variant="danger " onClick={handleBookingShow}>Proceed to book</Button></div>
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
                                                    value={playerData.FirstName}
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
                                                <div className="border h-100  ">
                                                    {availablefacility.map((facility, index) => (
                                                        <div key={index} className="form-check mt-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="facilityRadio"
                                                                id={`facilityRadio${index}`}
                                                                value={facility.title}
                                                                onClick={() => pricingrule(facility.id)}
                                                                onChange={handlefacilitychange}
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
                                                <div>

                                                    {pricingRules.map((rule, index) => (
                                                        <div key={index}>
                                                            <input
                                                                type="radio"
                                                                name="pricingRule"
                                                                value={rule.pricingRule.ruleName}
                                                                onChange={(e) => handleChangeRule(e, rule)}

                                                            />
                                                            <label>{rule.pricingRule.ruleName}

                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                            <Button variant="success  mt-2">Add</Button>
                                            <Button variant="danger mt-2" >Close</Button>
                                        </Row>
                                    </Offcanvas.Body>
                                </Offcanvas>
                                <Offcanvas className='w-75' show={Bookingshow} onHide={handleBookingClose} placement="end">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>Booking Preview</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Container >
                                            <Row>
                                                <Col xs={8}>
                                                    <div className="text-center">
                                                        <div>
                                                            {selectedFacility && (
                                                                <img
                                                                    src={userdata.find((data) => data.sport.id === parseInt(selectedFacility)).url}
                                                                    alt={`Facility ${selectedFacility}`}
                                                                />
                                                            )}
                                                        </div>
                                                        <p>{facilitylist}</p>
                                                    </div>
                                                    <div className="border p-3">
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Booking Type</Form.Label>
                                                                <p className="fw-bold fs-5" >{data.Booking}</p>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label>facliity Type</Form.Label>
                                                                <p className="fw-bold fs-5">{facilitylist}</p>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label>Booking Occurance</Form.Label>
                                                                <p className="fw-bold fs-5">Single Booking</p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Label>Start date and time</Form.Label>
                                                                <p className="fw-bold fs-5">{formattedStartDate}</p>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label>End date and time</Form.Label>
                                                                <p className="fw-bold fs-5">{formattedEndDate}</p>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label>Notes</Form.Label>
                                                            </Col>
                                                        </Row>
                                                        <div>
                                                            <ReservationTable />
                                                        </div>
                                                    </div>
                                                    <div>

                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <p className="fs-2 text-center">Mode of Payment</p>
                                                    <div className="border p-3">
                                                        <div className="border d-flex align-items-center justify-content-between p-2 mb-4">
                                                            <div className="  d-flex align-items-center ">
                                                                <Icon icon="mingcute:bank-card-line" className=" fs-1" />
                                                                <span className=" px-3 fs-4">Card Payment</span>
                                                            </div>
                                                            <div className="text-end">
                                                                <Form.Check inline type="radio" aria-label="radio 1" className="ms-5 mb-4" />
                                                            </div>
                                                        </div>
                                                        <div className="border d-flex align-items-center justify-content-between p-2 mb-4">
                                                            <div className="  d-flex align-items-center ">
                                                                <Icon icon="ic:outline-watch-later" className=" fs-1" />
                                                                <span className=" px-3 fs-4">Play Later</span>
                                                            </div>
                                                            <div className="text-end">
                                                                <Form.Check inline type="radio" aria-label="radio 1" className="ms-5" />
                                                            </div>
                                                        </div>
                                                        <div className="border d-flex align-items-center justify-content-between p-2">
                                                            <div className="  d-flex align-items-center ">
                                                                <Icon icon="mingcute:bank-card-line" className=" fs-1" />
                                                                <span className=" px-3 fs-4">No Payment</span>
                                                            </div>
                                                            <div className="text-end">
                                                                <Form.Check inline type="radio" aria-label="radio 1" className="ms-5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center p-3">
                                                        <Button variant="danger" className="p-3" >Book Now</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
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

