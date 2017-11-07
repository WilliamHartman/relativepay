import React, { Component } from 'react';
import './Chart.css';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';


class Chart extends Component {
    constructor(){
      super();

      this.state = {
        chartData: {}
      }

      this.createChartData = this.createChartData.bind(this);
    }

    componentWillMount = () => {
      this.createChartData();
    }

    componentWillReceiveProps = (nextProps) => {
      this.createChartData();
    }
    
    createChartData(){
        let salaries = this.props.salaries;
        let labels = salaries.map( salary => salary.city_name);
        let salariesArr = salaries.map( salary => salary.relative_salary);
        let colorsArr = salariesArr.map( (salary, i) => i%2 ? '#ffcb00': '#85bb65')

        this.setState({
            chartData: {
                labels: labels,
                datasets: [
                    {
                        label: this.props.jobName,
                        data: salariesArr,
                        backgroundColor: colorsArr,
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 2,
                        hoverBorderColor: '#000'
                    }
                ]
            }
        })
    }

    render(){
        return(
            <div className='chart'>
                <HorizontalBar 
                    data={this.state.chartData}
                    width={100}
                    height={2500}
                    options={{
                        title: {
                            display: true,
                            text: `${this.props.jobName} - Relative Salaries Chart`,
                            fontSize: 35
                        },
                        legend: {
                            display: false
                        },
                        layout: {
                            padding: {
                                left: 10, 
                                right: 10,
                                bottom: 0,
                                top: 0
                            }
                        },
                        tooltips: {
                            enabled: true
                        },
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                },
                            }],
                            // yAxes:[{
                            //     ticks: {
                            //         mirror: true
                            //     }
                            // }]
                        }
                    }}
                /> 
            </div>
        )
    }

}


function mapStateToProps(state){
    return {
        salaries: state.salaries
    }
  }
  
  export default connect(mapStateToProps, {  })(Chart);