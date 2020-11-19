import React, { Component } from 'react'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Col, Label, Row } from 'reactstrap';
import './ComponentView.css'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (value) => isNaN(Number(value));

class findTimeZone extends Component {
    render() {
        let showCountry = <div>Please enter two separate time zone</div>
        
        return (
            <div className="container">
                <div className="col-12 col-md-9">
                    <LocalForm className="view" onSubmit={(values) => this.distanceFindHandler(values)}>
                        <Row className="form-group">
                            <Label htmlFor="countryCode1" md={3}><strong>first Timezone</strong></Label>
                            <Col md={5}>
                                <Row>
                                    <Control.text model=".countryCode1" className="form-control" name="countryCode1" id="countryCode1" placeholder="Please enter the Country code below"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(3),
                                            isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".countryCode1"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must have 3 length',
                                            maxLength: ' Must have 3 length',
                                            isNumber: "Can't use numbers"
                                        }} />
                                </Row>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="countryCode1" md={3}><strong>Second TimeZone</strong></Label>
                            <Col md={5} >
                                <Row>
                                    <Control.text model=".countryCode2" className="form-control" name="countryCode2" id="countryCode2" placeholder="Please enter the Country code below"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(3),
                                            isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".countryCode2"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must have 3 length',
                                            maxLength: ' Must have 3 length',
                                            isNumber: "Can't use numbers"
                                        }} />
                                </Row>
                            </Col>
                        </Row>
                        <Button type="submit" value="submit">Find Distance</Button>
                        <Row>
                            <Col>
                                <strong>{showCountry}</strong>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        )
    }
}

export default findTimeZone;
