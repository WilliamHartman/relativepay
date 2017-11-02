import React, { Component } from 'react';
import './Results.css';
import { connect } from 'react-redux';

class Results extends Component {
  constructor(){
    super();

    this.resultsList = this.resultsList.bind(this);
  }
    resultsList(){
      return this.props.salaries.map( (salary, i) => {
        let relSalStr = '$' + salary.relative_salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return (
          <div key={i} className='results-list-jsx'>
            <div className='results-list-rank'>{i+1}</div>
            <div className='results-list-salary'>{relSalStr}</div>
            <div className='results-list-city'>{salary.city_name}</div>
            <div className='results-list-state'>{salary.state}</div>
          </div>
        )
      })
    }
  
  render() {
    let jsxSalaries = this.resultsList();
    return (
      <div className="results">
        <div className='results-list-container'>
          <div className='results-list-header'>
            <div className='results-list-rank'>Rank</div>
            <div className='results-list-salary'>Relative Salary</div>
            <div className='results-list-city-header'>City</div>
            <div className='results-list-state'>State</div>
          </div>
          {jsxSalaries}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      salaries: state.salaries
  }
}

export default connect(mapStateToProps, {  })(Results);