import { Offcanvas, Button, Alert, Form, Col, Row } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from "yup";
import React from "react";
const OffcanvasComponents = ({ playerShow, handleClosePlayer, handleSubmitPlayerList, playerDataList, handleNameDisclosure }) => {
    const { Formik } = formik;
    const schema1 = yup.object().shape({
        FirstName: yup.string().required("FirstName is a required field"),
        LastName: yup.string().required("LastName is a required field"),
        facility: yup.string().required("facility is a required field"),
        pricingRule: yup.string().required("pricingRule is a required field"),
    });
    return (
        <div>
            <Offcanvas show={playerShow} onHide={handleClosePlayer} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add player</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <Formik
                            validationSchema={schema1}
                            onSubmit={handleSubmitPlayerList}
                            initialValues={playerDataList}
                            enableReinitialize={true}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Check label={"Name not disclosed"}
                                        onChange={handleNameDisclosure}
                                        checked={playerDataList.isNameDisclosureChecked}
                                    />
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Label className="mt-3">First Name </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={handleChange}
                                                name="FirstName"
                                                value={playerDataList.isNameDisclosureChecked ? playerDataList.dis : values.FirstName}
                                                isInvalid={!!errors.FirstName && touched.FirstName}
                                                disabled={isNameDisclosureChecked}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.FirstName}
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Label className="mt-3">Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={handleChange}
                                                name="LastName"
                                                value={playerDataList.isNameDisclosureChecked ? playerDataList.dis : values.LastName}
                                                isInvalid={!!errors.LastName && touched.LastName}
                                                disabled={isNameDisclosureChecked}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.LastName}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                    <Form.Check className="mt-3" label={"Same as primary"} />
                                    <Row>
                                        <Col>
                                            <Form.Label>Facility <span className="text-danger ">*</span></Form.Label>
                                            <div className="border pricingruleshight overflow-y-scroll p-2">
                                                {availablefacility.map((facility, index) => (
                                                    <div key={index} className="form-check mt-2">
                                                        <Form.Check
                                                            type="radio"
                                                            name="facility"
                                                            id={`facility${index}`}
                                                            value={facility.title}
                                                            onClick={() => pricingrule(facility.id)}
                                                            onChange={handleChange}

                                                        />
                                                        <span> {facility.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <formik.ErrorMessage name="facility" component="div" className="text-danger" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Pricing rule <span className="text-danger">*</span></Form.Label>
                                            <div className="border pricingruleshight overflow-y-scroll p-2">
                                                {pricingRules.map((rule, index) => (
                                                    <div key={index}>
                                                        <Form.Check
                                                            type="radio"
                                                            name="pricingRule"
                                                            value={rule.pricingRule.ruleName}
                                                            onChange={handleChange}
                                                        />
                                                        <span>
                                                            {rule.pricingRule.ruleName}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <formik.ErrorMessage name="pricingRule" component="div" className="text-danger" />
                                        </Col>
                                        <div>
                                            {playerSuccessfully &&
                                                <Alert variant="success" className="d-none d-lg-block">
                                                    Player Added Successfully.
                                                </Alert>
                                            }
                                        </div>
                                        <div >
                                            <Button variant="success" type="submit" className="w-100" >Add</Button>
                                        </div>
                                        <div>
                                            <Button variant="danger" type="button" className="w-100" onClick={handleClosePlayer}>Close</Button>
                                        </div>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
export default OffcanvasComponents;