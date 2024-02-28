import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'; // Ensure proper import

function YourFormComponent({ handleSubmit, handleChange, values, availablefacility, pricingRules, pricingrule, handlefacilitychange, handleChangeRule, handleSubmitplayerlist }) {
  return (
    <div>
      <Form noValidate onSubmit={handleSubmit}>
        <div>
          <p className="fw-medium mt-3 fs-5">Player Details</p>
          <Row>
            <Col lg={6}>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="FirstName"
                value={values.FirstName}
              />
            </Col>
            <Col lg={6}>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="LastName"
                value={values.LastName}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Label>Mobile no</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="Mobile"
                value={values.Mobile}
              />
            </Col>
            <Col lg={6}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={handleChange}
                name="EmailAddress"
                value={values.EmailAddress}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Facility <span className="text-danger">*</span></Form.Label>
              <div className="border h-100 p-2">
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
                    <label className="form-check-label">
                      {facility.title}
                    </label>
                  </div>
                ))}
              </div>
            </Col>
            <Col>
              <Form.Label>Pricing rule <span className="text-danger">*</span></Form.Label>
              <div className="border h-100 p-2">
                {pricingRules.map((rule, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="pricingRule"
                      value={rule.pricingRule.ruleName}
                      onChange={(e) => handleChangeRule(e, rule)}
                    />
                    <label>
                      {rule.pricingRule.ruleName}
                    </label>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <div className="mt-3 float-end mb-2">
            <Button variant="success" type="submit">Save</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default YourFormComponent;
