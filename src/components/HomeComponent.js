import React, { Component } from 'react';
import Header from './HeaderComponenet';
import { Switch, Route } from 'react-router-dom';
import ViewDistance from './ViewDistance';
import NotNeighbourComponent from './NotNeighbourComponent';
import CountrySearch from './CountrySearch';
import SerachCountry from './findTimeZone';
import {connect } from 'react-redux'

class HomeComponent extends Component {

    state = {
        isLoaded: false,
        countries: [],
        authState: true
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
                <Header />
                <Switch>
                    {this.state.authState ?  <div><Route path="/checkDistance" component={() => <ViewDistance countries={this.state.countries}  distanceFind={this.props.onDistanceFinder}  distnase= {this.props.distnase}/>} />
                    <Route path="/closestCountry" component={() => <NotNeighbourComponent countries={this.state.countries} closeCountryFind={this.props.onCloseCountryFinder} closeCountryNotNeighbour ={this.props.closeCountiry} />} />
                    <Route path="/countrySearch" component={() => <CountrySearch countries={this.state.countries}  />} />
                    <Route path="/timeZone" component={() => <SerachCountry countries={this.state.countries} />} /></div> : null}
                </Switch>
             
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        distnase : state.distnase,
        closeCountiry: state.closeCountiry
    };
}

const mapDispatchToProps = dispatch => {

    return {
        onDistanceFinder: (country1, country2, countries) => dispatch({type: 'FIND_DISTSNCE', payload:{ country1:country1, country2: country2, countries: countries }}),
        onCloseCountryFinder: (country1, countries) => dispatch({type: 'CLOSE_COUNTRY', payload:{ country1:country1, countries: countries }}),
        onCountryFinder: (data) => dispatch({type: 'COUNTRY_SEARCH', charactors: data})
    };
}
 

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
