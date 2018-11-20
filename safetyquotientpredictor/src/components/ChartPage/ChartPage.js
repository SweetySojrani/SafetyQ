import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class ChartDisplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  render() {
    return (
      <div className="chart row chartPage">
      <div className="barChart">
        <div className="bar_chart">
          <Bar
            data={this.state.chartData}
          />
        </div>
        <div className="bar_chart">
          <Line
            data={this.state.chartData}
          />
        </div>
        </div>
        <br/>
        <br/>
        <div className="pieChart">
        <div className="bar_chart">
          <Pie
            data={this.state.chartData}
          />
        </div>
        <div className="bar_chart">
          <Pie
            data={this.state.chartData}
          />
        </div>
        </div>
      </div>
    );
  }
}

export default ChartDisplayPage;
