import React, {Component} from 'react';
import image from '../../ScreenShot.png';

class Home extends Component{
    render(){
        return(
            <div>
            <div className="header center-content pad-1-pc">
                <span><img className="header-img" src="https://www.evrent.co.uk/images/home_icon.png"/></span>
                <span className="">Safety Quotient Predictor</span>
            </div>
            <div className="home-page-container">
                <div className="content-container">
                    <div className="home-page-text">Safety isn't expensive, Its priceless!</div>
                    <div className="form-group row">
                        <input type="textbox" className="form-control form-control-lg search-box col-lg-9 col-md-9 col-sm-9" placeholder="Search"/>                        
                        <button className="btn btn-sm col-lg-1 col-md-1 col-sm-1 ml-1 go-btn">Go</button>
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