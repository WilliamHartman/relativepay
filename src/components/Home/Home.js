import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { removeSalaries, getPopularJobs, updateSalaries } from './../../ducks/reducer';
import { withRouter } from 'react-router';


class Home extends Component {
  constructor(){
    super();

    this.popularJobsList = this.popularJobsList.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);    
  }
  
  componentDidMount = () => {
    this.props.removeSalaries();
  }

  componentWillMount = () => {
    this.props.getPopularJobs();
  }

  handleSearchClick = (searchTerm) => {
    this.props.removeSalaries();
    this.props.updateSalaries(searchTerm);
    this.props.history.push('/results');
}
  
  popularJobsList(){
    return this.props.popularJobs.map( (job, i) => {
      let jobName = job.job_name.replace(/-+/g, ' ')
      jobName = jobName[0].toUpperCase() + jobName.substr(1);
      return(
          <div key={i} className='popular-jobs-list' onClick={() => this.handleSearchClick(jobName)}>
            <img src={job.image} alt={jobName} className='popular-jobs-list-image'/>
              <div className='popular-jobs-list-job'>
                <div>{jobName}</div>
              </div>
          </div>
      )
    })
  }

  render() {
    let jsxPopularJobs = this.popularJobsList();
    return (
      <div className="home">
        <div className='home-image-container'>
          <h4 className='home-image-rp'>RELATIVEPAY</h4>
          <h1 className='home-image-sal'>SALARIES</h1>
        </div>
        <div className='home-main-content'>
          <div className='home-top-search-container'>
            <h1>Top searches</h1>
            <div className='home-top-search-desktop'>
              {jsxPopularJobs}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      salaries: state.salaries,
      popularJobs: state.popularJobs
  }
}

export default withRouter(connect(mapStateToProps, { removeSalaries, getPopularJobs, updateSalaries })(Home));