import React, { Component } from 'react';
import './Results.css';
import { connect } from 'react-redux';

class Results extends Component {

  render() {
    return (
      <div className="Home">
        {this.props.salaries}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      salaries: state.salaries
  }
}

export default connect(mapStateToProps, { })(Results);