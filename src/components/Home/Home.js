import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { removeSalaries } from './../../ducks/reducer';


class Home extends Component {

  componentDidMount = () => {
    this.props.removeSalaries();
  }
  

  render() {

    return (
      <div className="home">
        <div className='home-image-container'>
          <h4 className='home-image-rp'>RELATIVEPAY</h4>
          <h1 className='home-image-sal'>SALARIES</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      salaries: state.salaries,
  }
}

export default connect(mapStateToProps, { removeSalaries })(Home);