import React, { Component } from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import CircularProgressbar from 'react-circular-progressbar';

import {rooturl} from '../../config';

class Prediction extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state={
            predictionData:{},
            sqpScore: 0
        }
    }

    componentWillMount(){
        this.getPredictionData();
        this.getSQPScore();
    }

    getPredictionData(){
        var data = {
            "City" : localStorage.getItem('city'),
            "Area Name": localStorage.getItem('street'),
            "Number of years": 3
        }
        axios.get(rooturl+'/getYearOnYearPrediction?City='+data.City + '&Area Name='+data["Area Name"]+'&N='+data["Number of years"])
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

    getSQPScore(){
        var data = {
            "City" : localStorage.getItem('city'),
            "Area Name": localStorage.getItem('street')
        }
        axios.get(rooturl+'/getSQPScore?City='+data.City + '&Area Name='+data["Area Name"])
            .then((response)=>{
                console.log('SQP score data: ', response.data);
                this.setState({
                    sqpScore: response.data.SQPFinal
                })
                
            });
    }

    render(){
        return(
            <div className="row">
                
                <div className="col-6 row center-content mt-5">
                    <CircularProgressbar percentage={this.state.sqpScore} text={Math.round(this.state.sqpScore)} />
                </div>
                <div className="col-6 mt-5">
                    <Line data={this.state.predictionData}></Line>
                </div>
                
            </div>
        )
    }
}

export default Prediction;