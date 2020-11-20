import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Col, Label, Row } from 'reactstrap';
import './ComponentView.css'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (value) => isNaN(Number(value));
export class NotNeighbourComponent extends Component {

     closeCountryFindHandler = (values) => {
        let countryCode = values.CountryName.toUpperCase();
        const countries = this.props.countries;
        this.props.closeCountryFind(countryCode, countries);
    }

    render() {
        //according to the state rendering the data.
        let showCountry
        if (this.props.closeCountryNotNeighbour) {
            showCountry = <div>This is the closest country to it that is not a neighbour: {this.props.closeCountryNotNeighbour} </div>
        }
        else {
            showCountry = <div>Please enter the alphacode country to see the closest country to it that is not a neighbour of that country</div>
        }
        return (
            <div className="container">
                <div className="col-12 col-md-9">
                    <LocalForm className="view" onSubmit={(values) => this.closeCountryFindHandler(values)}>
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
