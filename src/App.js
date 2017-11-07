import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import router from './router';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className = 'router-container'>
          {router}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
