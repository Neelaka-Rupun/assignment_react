import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Col, Label, Row } from 'reactstrap';
import './ViewDistance.css'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (value) => isNaN(Number(value));

class ViewDistance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            distnase: null
        }
        this.distanceFindHandler = this.distanceFindHandler.bind(this);
        // console.log(this.props.countries);
    }


    distanceFindHandler(values) {
        let conuntry1 = values.countryCode1.toUpperCase();
        let conuntry2 = values.countryCode2.toUpperCase();
        let lat1 = null;
        let long1 = null;
        let lat2 = null;
        let long2 = null;
        this.props.countries.forEach(country => {
            if (country.alpha3Code === conuntry1) {
                lat1 = country.latlng[0];
                long1 = country.latlng[1];
            }
            if (country.alpha3Code === conuntry2) {
                lat2 = country.latlng[0];
                long2 = country.latlng[1];
            }
        })
        // console.log(lat1,lat2, long1, long2);
        if (lat1 && lat2 && long1 && long2) {
            const distnase = this.distance(lat1, long1, lat2, long2, "K");
            this.setState({
                distnase: distnase
            })
        }
    }

    distance(lat1, lon1, lat2, lon2, unit) {
        let dist = null;
        if ((lat1 === lat2) && (lon1 === lon2)) {
            dist = 0;
        }
        else {
            let radlat1 = Math.PI * lat1 / 180;
            let radlat2 = Math.PI * lat2 / 180;
            let theta = lon1 - lon2;
            let radtheta = Math.PI * theta / 180;
            dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === "K") { dist = dist * 1.609344 }
        }
        // console.log(dist);
        return dist;
    }

    render() {

        // console.log(this.state.distnase)
        let DistanceView = <div>Please enter Country codes to see the Diestance</div>

        if (this.state.distnase > 0) {
            DistanceView = <div>Distance is: {this.state.distnase.toFixed(2)} Km</div>
        }
        if (this.state.distnase === 0.00) {
            DistanceView = <div>Distance is: {this.state.distnase} Please enter Differnt country code </div>
        }

        return (
            <div className="container">
                <div className="col-12 col-md-9">
                    <LocalForm className="view" onSubmit={(values) => this.distanceFindHandler(values)}>
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
