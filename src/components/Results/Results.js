import React, { Component } from 'react';
import './Results.css';
import { connect } from 'react-redux';
import { getSalariesByState, getSalariesByRank, getSalariesByCity } from './../../ducks/reducer';

class Results extends Component {
  constructor(){
    super();

    this.orderByRank = this.orderByRank.bind(this);
    this.orderByCity = this.orderByCity.bind(this);
    this.orderByState = this.orderByState.bind(this);
  }

  resultsList(){
    return this.props.salaries.map( (salary, i) => {
      let relSalStr = '$' + salary.relative_salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return (
        <div key={i} className='results-list-jsx'>
          <div className='results-list-rank'>{salary.salary_rank}</div>
          <div className='results-list-salary'>{relSalStr}</div>
          <div className='results-list-city'>{salary.city_name}</div>
          <div className='results-list-state'>{salary.state}</div>
        </div>
      )
    })
  }

  orderByRank(searchTerm){
    this.props.getSalariesByRank(searchTerm);
  }

  orderByCity(searchTerm){
    this.props.getSalariesByCity(searchTerm);
  }

  orderByState(searchTerm){
    this.props.getSalariesByState(searchTerm);
  }
  
  render() {
    let jsxSalaries = this.resultsList();
    return (
      <div className="results">
        <div className='results-list-container'>
          <div className='results-list-header'>
            <div className='results-list-rank' onClick={()=> this.orderByRank(this.props.salaries[0].job_name)}>Rank</div>
            <div className='results-list-salary' onClick={()=> this.orderByRank(this.props.salaries[0].job_name)}>Relative Salary</div>
            <div className='results-list-city-header' onClick={()=> this.orderByCity(this.props.salaries[0].job_name)}>City</div>
            <div className='results-list-state' onClick={()=> this.orderByState(this.props.salaries[0].job_name)}>State</div>
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

export default connect(mapStateToProps, { getSalariesByState, getSalariesByRank, getSalariesByCity })(Results);