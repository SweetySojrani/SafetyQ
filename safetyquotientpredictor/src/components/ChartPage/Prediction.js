import React, { Component } from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import CircularProgressbar from 'react-circular-progressbar';

class Prediction extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state={
            predictionData:{}
        }
    }

    componentWillMount(){
        this.getPredictionData();
    }

    getPredictionData(){
        var data = {
            "City" : "Los Angeles",
            "Area Name": "Central",
            "Number of years": 3
        }
        axios.get('http://localhost:5000/getYearOnYearPrediction?City='+data.City + '&Area Name='+data["Area Name"]+'&N='+data["Number of years"])
            .then((response)=>{
                console.log('prediction Response data: ', response.data);
                var resultArr = []
                for(var key in response.data){
                resultArr.push(response.data[key]);
                }
                console.log('Prediction Result array', resultArr);
                var chartData = {
                labels: ["2013","2014", "2015", "2016", "2017", "2018", "2019", "2020"],
                datasets: [
                    {
                    label: "Prediction Result", data: resultArr, fill:false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    }
                ]};

                this.setState({
                    predictionData : chartData
                });
            });
    }

    render(){
        return(
            <div className="row">
                
                <div className="col-6 row center-content mt-5">
                    <CircularProgressbar percentage={90} text={90} />
                </div>
                <div className="col-6 mt-5">
                    <Line data={this.state.predictionData}></Line>
                </div>
                
            </div>
        )
    }
}

export default Prediction;