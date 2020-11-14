import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Col, Label, Row } from 'reactstrap';
import './ViewDistance.css'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (value) => isNaN(Number(value));
export class NotNeighbourComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country: null
        }
        this.closestCountry = this.closestCountry.bind(this);
    }

    closestCountry(values) {
        let countryCode = values.CountryName.toUpperCase();
        console.log(countryCode)
        console.log(this.props);
        const countries = this.props.countries;
        const input = countryCode;
        const inputCountry = countries.find(country => country.alpha3Code === input);
        const boaders = inputCountry?.borders ? inputCountry.borders : [];
        //Serched through the internet and found the largerst distence between two countries and assigned that as min distance
        let minDistance = 19994;
        let nearCountry = null;
        countries.filter(country => !boaders.includes(country.alpha3Code)).forEach(country => {
            const distance = this.distanceFindHandler(country.alpha3Code, input);
            if (distance && minDistance > distance) {
                minDistance = distance;
                nearCountry = country.name;
                this.setState({
                    country: nearCountry
                })
            }
        });



    }

    distanceFindHandler(conuntry1, conuntry2) {
        let lat1 = null;
        let long1 = null;
        let lat2 = null;
        let long2 = null;
        let distnase = null;
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
        if (lat1 && lat2 && long1 && long2) {
            distnase = this.distance(lat1, long1, lat2, long2, "K");
            return distnase;
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
        return dist;
    }


    render() {
        //according to the state rendering the data.
        let showCountry
        if (this.state.country) {
            showCountry = <div>This is the closest country to it that is not a neighbour: {this.state.country} </div>
        }
        else {
            showCountry = <div>Please enter the alphacode country to see the closest country to it that is not a neighbour of that country</div>
        }
        return (
            <div className="container">
                <div className="col-12 col-md-9">
                    <LocalForm className="view" onSubmit={(values) => this.closestCountry(values)}>
                        <Row className="form-group">
                            <Label htmlFor="CountryName" md={3}><strong>Country Name</strong></Label>
                            <Col md={5}>
                                <Row>
                                    <Control.text model=".CountryName" className="form-control" name="CountryName" id="CountryName" placeholder="Please enter the Country Name"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".CountryName"
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
                        <Button type="submit" value="submit">Find Close Country</Button>
                        <Row>
                            <Col><strong>{showCountry}</strong>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        )
    }
}

export default NotNeighbourComponent
