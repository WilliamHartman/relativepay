import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { removeSalaries, getPopularJobs, updateSalaries } from './../../ducks/reducer';
import { Link } from 'react-router-dom';



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
}
  
  popularJobsList(){
    return this.props.popularJobs.map( (job, i) => {
      let jobName = job.job_name.replace(/-+/g, ' ')
      jobName = jobName[0].toUpperCase() + jobName.substr(1);
      console.log(jobName)
      return(
        <Link key={i} to='/results'>
          <div className='popular-jobs-list' onClick={this.handleSearchClick(jobName)}>
            <img src={job.image} alt={jobName} className='popular-jobs-list-image'/>
              <div className='popular-jobs-list-job'>
                <div>{jobName}</div>
              </div>
          </div>
        </Link>
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
            {jsxPopularJobs}
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

export default connect(mapStateToProps, { removeSalaries, getPopularJobs, updateSalaries })(Home);