import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Col, Label, Row } from 'reactstrap';
import './ComponentView.css';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (value) => isNaN(Number(value));

class ViewDistance extends Component {

    distanceFind = (values) => {
        values.preventDefault();
        let conuntry1 = values.countryCode1.toUpperCase();
        let conuntry2 = values.countryCode2.toUpperCase();
        let countires = this.props.countries
       this.props.distanceFind(conuntry1,conuntry2, countires);
    }

    render() {

        let DistanceView = <div>Please enter Country codes to see the Diestance</div>

        if (this.props.distnase > 0) {
            DistanceView = <div>Distance is: {this.props.distnase.toFixed(2)} Km</div>
        }
        if (this.props.distnase === 0.00) {
            DistanceView = <div>Distance is: {this.props.distnase} Please enter Differnt country code </div>
        }

        return (
            <div className="container">
                <div className="col-12 col-md-9">
                    <LocalForm className="view" onSubmit={(values) => this.distanceFind(values)}>
                        <Row className="form-group">
                            <Label htmlFor="countryCode1" md={3}><strong>1st Country Code</strong></Label>
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
                            <Label htmlFor="countryCode1" md={3}><strong>2nd Country Code</strong></Label>
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
                                <strong>{DistanceView}</strong>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        );
    }
}

export default ViewDistance;
