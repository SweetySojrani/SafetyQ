import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import ChartDisplayPage from './ChartPage/ChartPage';
import ChartLanding from './ChartPage/ChartLanding';
import Analytics from './ChartPage/Analytics';
import Prediction from './ChartPage/Prediction';

class Main extends Component{

    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
            <div>
                <Route exact path="/" component={Home}/>  
                <Route exact path="/ChartDisplayPage" component={ChartDisplayPage}/>
                <Route exact path="/ChartLanding" component={ChartLanding}/>  
                <Route path="/analytics" component={Analytics}/>     
                <Route path="/prediction" component={Prediction} />                        
            </div>
        )
    }
}

export default Main;