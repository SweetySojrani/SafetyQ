import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class ChartDisplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      barChartBoolean: false,
      pieChartBoolean: false
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
      <div className="chart row">
        <div className="chart1Row">
          <div className = "chart1Show col-xs-3">
            <div className="bar_chart" data-toggle="modal" data-target="#myModal">
              <Bar data={this.state.chartData}/>
            </div>
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
      
                    <div className="modal-header">
                      <h4 className="modal-title">Chart 1 Detail</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="bar_chart_zoom">
                      <Bar data={this.state.chartData}/>
                    </div>
                  </div>
                </div>
              </div>
          </div>

        <div className = "chart1Show col-xs-3">
            <div className="bar_chart" data-toggle="modal" data-target="#myModal1">
              <Line data={this.state.chartData}/>
            </div>
            <div className="modal" id="myModal1">
              <div className="modal-dialog">
                <div className="modal-content">
      
                    <div className="modal-header">
                      <h4 className="modal-title">Chart 2 Detail</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="bar_chart_zoom">
                      <Line data={this.state.chartData}/>
                    </div>
                  </div>
                </div>
              </div>
          </div>    
        <div className="chart1Show col-xs-2">
        <div className="bar_chart" data-toggle="modal" data-target="#myModal3">
          <Pie
            data={this.props.dayNightChartData}
          />
        </div>
        <div className="modal" id="myModal3">
              <div className="modal-dialog">
                <div className="modal-content">
      
                    <div className="modal-header">
                      <h4 className="modal-title">Chart 3 Detail</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="bar_chart_zoom">
                      <Pie data={this.props.dayNightChartData}/>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        {/* <div className="bar_chart">
          <Pie
            data={this.state.chartData}
          />
        </div> */}
        </div>   
        
            
       
      </div>
    );
  }
}

export default ChartDisplayPage;