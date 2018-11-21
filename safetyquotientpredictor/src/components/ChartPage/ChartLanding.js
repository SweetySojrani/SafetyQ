import React, { Component } from "react";
import Chart from "./ChartPage";
import axios from 'axios';
class ChartLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }
  componentWillMount() {
    
    var resultdata={};
    //axios.defaults.withCredentials= true;
    axios.get('http://localhost:5000/getCrimeData')
      .then((response)=>{
        resultdata = response.data
        console.log('resultdata', resultdata);
        this.getChartData(resultdata);
      });
      
    
  }
  getChartData(resultdata) {
    // Ajax calls here
    this.setState({
      chartData: {
        labels: [
          "Boston",
          "Worcester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        datasets: [
          {
            label: "Safety Score",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "rgba(0, 123, 182, 0.8)",
              "rgba(236, 85, 85, 0.8)",
              "rgba(124,252,0, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(15, 159, 64, 0.8)",
              "rgba(15, 99, 132, 0.8)"
            ]
          }
        ]
      }
    });
  }
  render() {
    return (
      <div className="chartPage">
        <h1>SAFETY SCORE ANALYSIS</h1>
        <h3>Summary</h3>
        <span className = "ScoreDisplay">68%! </span>
        <span className = "safetyScoreDisplay">  Your Safery Score</span>
        <br/>
        <br/>
        <br/>
        <Chart className="chartPage"
          chartData={this.state.chartData}
          location="Massachusetts"
          legendPosition="bottom"
        />
      </div>
    );
  }
}

export default ChartLanding;
