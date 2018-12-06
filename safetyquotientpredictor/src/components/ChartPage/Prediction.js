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
            sqpScore: 0,
            recommnededAreas : []
        }
    }

    componentWillMount(){
        this.getPredictionData();
        this.getSQPScore();
        this.recommend();
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

    recommend() {
        var data = {
            "City" : localStorage.getItem('city'),
        }
        axios.get(rooturl+'/getRecommendedArea?City='+data.City)
            .then((response)=>{
                 console.log('Recommended areas to live: ', response.data); 
                 this.setState({
                    recommnededAreas : response.data
                 })
                
            });
    }

    render(){

        var recommendationContent = this.state.recommnededAreas.map((item, index)=>{
            return(
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{localStorage.getItem('city')}</td>
                    <td>{item.area}</td>
                    <td>{Number(item.sqp).toFixed(2)}</td>
                    <td className="green">{Number((item.sqp - this.state.sqpScore)/(this.state.sqpScore) * 100).toFixed(2)}</td> 
                </tr>
            )
            });
        return(
            <div className="row">
                <div className="col-6 row center-content mt-5">
                    <CircularProgressbar percentage={this.state.sqpScore} text={Math.round(this.state.sqpScore)} />
                </div>
                <div className="col-6 mt-5">
                    <Line data={this.state.predictionData}></Line>
                </div>
                
                <div className="col-2"></div>
                <div className="col-9 mt-5">
                    <div className="center-content mt-5">
                        <h3>Recommended Areas based on your search</h3>
                    </div>
                    
                    <table className="table table-dark table-striped mt-5 mb-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">City</th>
                                <th scope="col">Locality</th>
                                <th scope="col">SQP Score</th>
                                <th scope="col">&uarr; % </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendationContent}
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
}

export default Prediction;