import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import homeImgLarge from './homeImgLarge.png';
import homeImgMobile from './homeImgMobile.png';


class Home extends Component {

  render() {

    return (
      <div className="home">
        <div className='home-image-container'>
          <img src={homeImgLarge} alt="logo" className='home-image'/>
        </div>
        <div>Home component</div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      salaries: state.salaries,
  }
}

export default connect(mapStateToProps, { })(Home);