import React, { Component } from 'react';
import './Chart.css';
import Chart from 'chart.js';

var myChart = new Chart(ctx, {...});

class Chart extends Component {
    constructor(){
      super();

    }

    render(){
        return(
            <div>
                
            </div>
        )
    }

}


function mapStateToProps(state){
    return {
        salaries: state.salaries
    }
  }
  
  export default withRouter(connect(mapStateToProps, {  })(Chart));