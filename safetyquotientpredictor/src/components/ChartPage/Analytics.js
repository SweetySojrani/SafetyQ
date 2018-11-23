import React, { Component } from "react";
import axios from 'axios';
import {Pie, Bar, Doughnut, Line, HorizontalBar} from 'react-chartjs-2';
import {Link} from 'react-router-dom';
class Analytics extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            dayNightData:{},
            crimeTypeData:{},
            genderTypeData:{},
            ageData:{},
            raceTypeData:{},
            yearComparisionData:{}
        }
    }

    componentWillMount(){
        this.getDayNightData(); 
        this.getCrimeTypeData();
        this.getGenderTypeData();   
        this.getAgeData();
        this.getRaceTypeData();
        this.getYearComparionsionData();
    }

    getDayNightData(){
        var data = {
            "City" : "Los Angeles",
            "Area Name": "Central"
        }
        axios.get('http://localhost:5000/getDayNightData?City='+data.City + '&Area Name='+data["Area Name"])
            .then((response)=>{
                console.log('Day Night Response data: ', response.data);
                var resultArr = []
                for(var key in response.data){
                resultArr.push(response.data[key]);
                }
                console.log('Day Night Result array', resultArr);
                var chartData = {
                labels: ["Day","Night"],
                datasets: [
                    {
                    label: "Day vs Night", data: resultArr,
                    backgroundColor: ["rgba(0, 123, 182, 0.8)","rgba(236, 85, 85, 0.8)"]
                    }
                ]};

                this.setState({
                    dayNightData : chartData
                });
            });
    }

    getCrimeTypeData(){
        var data = {
            "City" : "Los Angeles",
            "Area Name": "Central"
        }
        axios.get('http://localhost:5000/getCrimeType?City='+data.City + '&Area Name='+data["Area Name"])
            .then((response)=>{
                console.log('Crime Type Response data: ', response.data);
                var resultArr = []
                for(var key in response.data){
                resultArr.push(response.data[key]);
                }
                console.log('Crime Type Result array', resultArr);
                var chartData = {
                labels: ["Burglary","Assault", "Violations", "Sex Crimes", "Others"],
                datasets: [
                    {
                        label: "Classification based on Crime Type", data: resultArr,
                        backgroundColor: ["#efa2e3","rgba(236, 85, 85, 0.8)","rgba(124,252,0, 0.8)","rgba(75, 192, 192, 0.8)",
                        "rgba(255,255,0)","rgba(255,255,0)"]
                    }
                ]};

                this.setState({
                    crimeTypeData : chartData
                });
            });
    }

    getGenderTypeData(){
        var data = {
            "City" : "Los Angeles",
            "Area Name": "Central"
        }
        axios.get('http://localhost:5000/getGenderData?City='+data.City + '&Area Name='+data["Area Name"])
            .then((response)=>{
                console.log('Gender Type Response data: ', response.data);
                var resultArr = []
                for(var key in response.data){
                resultArr.push(response.data[key]);
                }
                console.log('Gender Type Result array', resultArr);
                var chartData = {
                labels: ["Male", "Female"],
                datasets: [
                    {
                        label: "Classification based on Gender Type", data: resultArr,
                        backgroundColor: ["#0777e8","#f0e947"]
                    }
                ]};

                this.setState({
                    genderTypeData : chartData
                });
            });
    }

    getAgeData(){
        var data = {
            "City" : "Los Angeles",
            "Area Name": "Central"
        }
        axios.get('http://localhost:5000/getAgeData?City='+data.City + '&Area Name='+data["Area Name"])
            .then((response)=>{
                console.log('Age Response data: ', response.data);
                var resultArr = []
                for(var key in response.data){
                resultArr.push(response.data[key]);
                }
                console.log('Age Result array', resultArr);
                var chartData = {
                labels: ["1-18 years", "19-25 years", "26-40 years", "41-60 years", "60+ years"],
                datasets: [
                    {
                        label: "Classification based on Age", data: resultArr,
                        backgroundColor: ["rgba(124,252,0, 0.8)","rgba(75, 192, 192, 0.8)",
                        "rgba(153, 102, 255, 0.8)","rgba(15, 159, 64, 0.8)","rgba(255,255,0)"]
                    }
                ]};

                this.setState({
                    ageData : chartData
                });
            });
    }

    getRaceTypeData(){
        var data = {
            "City" : "Los Angeles",
            "Area Name": "Central"
        }
        axios.get('http://localhost:5000/getRaceData?City='+data.City + '&Area Name='+data["Area Name"])
            .then((response)=>{
                console.log('Race Type Response data: ', response.data);
                var resultArr = []
                for(var key in response.data){
                resultArr.push(response.data[key]);
                }
                console.log('Race Type Result array', resultArr);
                var chartData = {
                labels: ["White", "Others", "Hispanic", "Black", "Asian", "Caucassian"],
                datasets: [
                    {
                        label: "Classification based on Race", data: resultArr,
                        backgroundColor: ["rgba(124,252,0, 0.8)","rgba(75, 192, 192, 0.8)",
                        "rgba(153, 102, 255, 0.8)","rgba(15, 159, 64, 0.8)","rgba(255,255,0)","#00FFFF" ]
                    }
                ]};

                this.setState({
                    raceTypeData : chartData
                });
            });
    }

    getYearComparionsionData(){
        var data = {
            "City" : "Los Angeles",
            "Area Name": "77th Street"
        }
        axios.get('http://localhost:5000/getDateData?City='+data.City + '&Area Name='+data["Area Name"])
            .then((response)=>{
                console.log('Year Response data: ', response.data);
                var resultArr = []
                for(var key in response.data){
                resultArr.push(response.data[key]);
                }
                console.log('Year  Result array', resultArr);
                var chartData = {
                labels: ["2013", "2014", "2015", "2016", "2017"],
                datasets: [
                    {
                        label: "Classification based on Year", data: resultArr,
                        backgroundColor: ["#fccf00","rgba(75, 192, 192, 0.8)",
                        "rgba(153, 102, 255, 0.8)","rgba(15, 159, 64, 0.8)","rgba(255,255,0)","#00FFFF" ]
                    }
                ]};

                this.setState({
                    yearComparisionData : chartData
                });
            });
    }



    render(){
        return(
            <div className="mt-5 center-content analytics-container">
            <div className="row center-content">
                <div className="col-6">
                    <Doughnut data={this.state.dayNightData}/>
                </div>
                
                <div className="col-6">
                    <Pie data={this.state.genderTypeData}/>
                </div>
                <div className="col-3"></div>
                <div className="col-6">                    
                    <Pie data={this.state.crimeTypeData}/>
                </div>
                <div className="col-6 mt-3">
                    <Bar data={this.state.ageData} />
                </div>
                <div className="col-6 mt-3">
                    <Bar data={this.state.raceTypeData} />
                </div>
                <div className="col-3"></div>
                <div className="col-6 mt-3">                    
                    <HorizontalBar data={this.state.yearComparisionData}/>
                </div>
                <div className="col-3"></div>
                <div className="col-5"></div>
                <div className="center-content mt-5">
                    <Link to="/prediction" className="btn btn-lg btn-success"><b>SQP Score >></b></Link>
                </div>
                </div>
            </div>

        )
    }
}

export default Analytics;