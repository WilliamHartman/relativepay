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
        return (
          <div key={i}>{salary.city_name} - {salary.salary}</div>
        )
      })
    }
  
  render() {
    let jsxSalaries = this.resultsList();
    return (
      <div className="results">
        {jsxSalaries}
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