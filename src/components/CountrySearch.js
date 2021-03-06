import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Col, Label, Row } from 'reactstrap';
import './ComponentView.css';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (value) => isNaN(Number(value));

class CountrySearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serachResult: []

        }

    }

    getCountryName(value) {
        let country = value.countryName.toUpperCase();
        this.findCountry(country);
    }

    findCountry(value) {
        let data = null;
        data = this.props.countries.map(country => country.name).filter(name => name.toUpperCase().includes(value.toUpperCase()));
        if (data.length > 0) {
            this.setState({
                serachResult: data
            })
        }
    }


    render() {

        let serachResult = <div>Please eneter the two charactors to see the countries</div>
        if (this.state.serachResult) {
            serachResult = <div> 
                {this.state.serachResult.map((item,index) =>{
                    return (
                        <span key={index}>
                            <p >{item}</p>
                            <hr/>
                        </span>
                        
                    )
                })}
                </div>
        }
        return (
            <div className="container">
                <div className="col-12 col-md-9">
                    <LocalForm className="view" onSubmit={(values) => this.getCountryName(values)}>
                        <Row className="form-group">
                            <Label htmlFor="countryName" md={3}><strong>Country Name</strong></Label>
                            <Col md={5}>
                                <Row>
                                    <Control.text model=".countryName" className="form-control" name="countryName" id="countryName" placeholder="Please enter the Country Name below"
                                        validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(2),
                                            isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".countryName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must have 1 characters',
                                            maxLength: ' Must have 2 characters',
                                            isNumber: "Can't use numbers"
                                        }} />
                                </Row>
                            </Col>
                        </Row>
                        <Button type="submit" value="submit">Find Country</Button>
                        <Row>
                            <Col>
                            <br/>
                                <strong>{serachResult}</strong>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        )
    }
}

export default CountrySearch
