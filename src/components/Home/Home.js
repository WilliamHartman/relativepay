import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';


class Home extends Component {

  render() {

    return (
      <div className="home">
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