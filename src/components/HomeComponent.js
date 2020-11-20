import React, { Component } from 'react';
import Header from './HeaderComponenet';
import { Switch, Route, Redirect } from 'react-router-dom';
import ViewDistance from './ViewDistance';
import NotNeighbourComponent from './NotNeighbourComponent';
import CountrySearch from './CountrySearch';
import SerachCountry from './findTimeZone';
import {connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

class HomeComponent extends Component {

    state = {
        isLoaded: false,
        countries: [],
    }

    
    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        countries: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    render() {

        return (
            <>
                <Header isAuth={this.props.onAuth} authStatus={this.props.authenticated} maxAtempt ={this.props.maxAttempts} />  
                <Switch>
                    {this.props.authenticated ?  <div><Route path="/checkDistance" component={() => <ViewDistance countries={this.state.countries}  distanceFind={this.props.onDistanceFinder}  distnase= {this.props.distnase}/>} />
                    <Route path="/closestCountry" component={() => <NotNeighbourComponent countries={this.state.countries} closeCountryFind={this.props.onCloseCountryFinder} closeCountryNotNeighbour ={this.props.closeCountiry} />} />
                    <Route path="/countrySearch" component={() => <CountrySearch countries={this.state.countries}  />} />
                    <Route path="/timeZone" component={() => <SerachCountry countries={this.state.countries} />} /></div> : <Redirect to="/"/>}
                </Switch>
             
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        distnase : state.distnase,
        closeCountiry: state.closeCountiry,
        authenticated: state.authenticated !== null,
        maxAttempts: state.maxAttempts !== false
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onDistanceFinder: (country1, country2, countries) => dispatch(actionCreators.findDistance(country1, country2, countries)),
        onCloseCountryFinder: (country1, countries) => dispatch(actionCreators.closeCountry(country1, countries)),
        onAuth: (email, password, counter) =>  dispatch(actionCreators.authStart(email, password, counter))
    };
}
 

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
