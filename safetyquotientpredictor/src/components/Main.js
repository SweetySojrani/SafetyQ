import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
class Main extends Component{

    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
            <div>
                <Route exact path="/" component={Home}/>                
            </div>
        )
    }
}

export default Main;