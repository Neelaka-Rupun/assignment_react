import React, { Component } from 'react';
import Header from './HeaderComponenet';
import { Switch, Route, Redirect } from 'react-router-dom';
import ViewDistance from './ViewDistance';
import NotNeighbourComponent from './NotNeighbourComponent';
import CountrySearch from './CountrySearch';
import SerachCountry from './findTimeZone';

class HomeComponent extends Component {

    state = {
        isLoaded: false,
        countries: []
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
                    <Route path="/checkDistance" component={()=><ViewDistance countries ={this.state.countries}/>} />
                    <Route path="/closestCountry" component={()=><NotNeighbourComponent countries ={this.state.countries}/>} />
                    <Route path="/countrySearch" component={()=><CountrySearch countries ={this.state.countries}/>} />
                    <Route path="/timeZone" component={()=><SerachCountry countries ={this.state.countries}/>} />
                   
            </Switch>
            </>
        );
    }
}

export default HomeComponent;
