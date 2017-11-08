import React, { Component } from 'react';
import './Results.css';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { getSalariesByState, getSalariesByRank, getSalariesByCity } from './../../ducks/reducer';
import Chart from '../Chart/Chart';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Results extends Component {
  constructor(){
    super();

    this.state = {
      open: false,
      salary: {
        salary: 0,
        relative_salary: 0
      }
    }

    this.orderByRank = this.orderByRank.bind(this);
    this.orderByCity = this.orderByCity.bind(this);
    this.orderByState = this.orderByState.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  resultsList(){
    if(this.props.salaries.length === 1) {
      return (<h1 className='results-fail'>Glassdoor does not have any salary information on that job.</h1>)
    }
    return this.props.salaries.map( (salary, i) => {
      let relSalStr = '$' + salary.relative_salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return (
        <div key={i} className='results-list-jsx' onClick={() => this.handleOpen(salary)}>
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

  handleOpen = (selectedSalary) => {
    this.setState({
      open: true,
      salary: selectedSalary
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };
  
  render() {
    let jsxSalaries = this.resultsList();
    let jobName = '';

    console.log(this.props.salaries)
    if(this.props.salaries.length === 0){
      return (
        <div className='results'>
          <div className='loading-container'>
            <CircularProgress size={80} thickness={7} color={'#85bb65'} />
            <h3>Fetching data...</h3>
            <h5>This could take 30-60 seconds</h5>
          </div>
        </div>
      ) 
    } else {
      jobName = this.props.salaries[0].job_name.replace(/-+/g, ' ');
      jobName = jobName[0].toUpperCase() + jobName.substr(1);
    }

    if(this.props.salaries.length === 1) {
      return (
        <div className="results">
          {jsxSalaries}
        </div>
      )
    }

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />];
      let salary = this.state.salary;
    
    return (
      <div className="results">
        <Dialog
          title={`${salary.city_name}, ${salary.state}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width:'300px'}}
        >
          <b>Cost of Living Index: </b>{salary.col} <br /><b>Raw Salary: </b>${salary.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} <br /><b>Relative Salary: </b>${salary.relative_salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} <br /><b>Rank: </b>{salary.salary_rank}
        </Dialog>
        <div className='results-list-container'>
          <Chart jobName={jobName} className='results-chart'/>
          <div className='results-list-desktop'>
            <h1 className='results-salary-name'>{jobName} - Relative Salaries List</h1>
            <div className='results-list-header'>
              <div className='results-list-rank' onClick={()=> this.orderByRank(this.props.salaries[0].job_name)}>Rank</div>
              <div className='results-list-salary' onClick={()=> this.orderByRank(this.props.salaries[0].job_name)}>Relative Salary</div>
              <div className='results-list-city-header' onClick={()=> this.orderByCity(this.props.salaries[0].job_name)}>City</div>
              <div className='results-list-state' onClick={()=> this.orderByState(this.props.salaries[0].job_name)}>State</div>
            </div>
            {jsxSalaries}
          </div>
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