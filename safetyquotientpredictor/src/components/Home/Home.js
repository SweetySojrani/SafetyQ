import React, {Component} from 'react';
import image from '../../ScreenShot.png';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            street: '',
            city: '',
            authFlag: false
        }
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.streetChangeHandler = this.streetChangeHandler.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    streetChangeHandler = (e) => {
        this.setState({
            street: e.target.value
        })
    }

    submitSearch(e) {
        e.preventDefault();
        localStorage.setItem('street',this.state.street);
        localStorage.setItem('city',this.state.city);
        this.setState({
            authFlag: true
        })
    }

    render(){
        var redirectVar = null;
        if(this.state.authFlag==true) {
            redirectVar = <Redirect to = "/analytics"/>
        }
        console.log(this.state.authFlag);
        return(
            <div>
                {redirectVar}
            <div className="header center-content pad-1-pc">
                <span><img className="header-img" src="https://www.evrent.co.uk/images/home_icon.png"/></span>
                <span className="">Safety Quotient Predictor</span>
            </div>
            <div className="home-page-container">
                <div className="content-container">
                    <div className="home-page-text">Safety isn't expensive, Its priceless!</div>
                    <div className="form-group row">
                       
                        <input type="textbox" onChange= {this.cityChangeHandler} value={this.state.city} className="form-control form-control-lg search-box search-box-1 col-lg-4 col-md-4 col-sm-4" placeholder="City"/>                        
                        <input type="textbox" onChange= {this.streetChangeHandler} value={this.state.street} className="form-control form-control-lg search-box col-lg-4 col-md-4 col-sm-4" placeholder="Area"/>   
                        <button onClick={this.submitSearch} className="btn btn-sm col-lg-1 col-md-1 col-sm-1 ml-1 go-btn">Go</button>
                    </div>
                </div>
            </div>
            <div className="center-content mt-5">
                <div className="addon-content">What are you looking for? </div>
                <div className="addon-sub-content">Behind each apartment for rent, every innovative tool and local neighborhood we scour, </div>
                <div className="addon-sub-content">there's a team driven to help find your next rental home.</div>
            </div>
            <div className="center-content mt-5">
                <div className="row thumbnails-container">
                    <div className="col-1">
                    
                    </div>
                    <div className="col-3">
                        <img src="https://www.cbronline.com/wp-content/uploads/2017/06/shutterstock_564080401-770x502.jpg" />
                    </div>
                    <div className="col-1">

                    </div>
                    <div className="col-3">
                    <img src={image} />
                    </div>
                    <div className="col-1">
                    
                    </div>
                    <div className="col-3">
                        <img src="https://www.onlinecharttool.com/pics/logo.png" />
                    </div>
                </div>
            </div>
            <div className="footer center-content mt-5">
                copyright Safety Quotient Predictor
            </div>
            </div>
            
        )
    }
}

export default Home;