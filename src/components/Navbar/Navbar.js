import React, { Component } from 'react';
import './Navbar.css';
import Drawer from 'material-ui/Drawer';
import MDMenu from 'react-icons/lib/md/menu.js';
import MDSearch from 'react-icons/lib/md/search.js';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSalaries, removeSalaries } from './../../ducks/reducer';
import { withRouter } from 'react-router';
import logo from './relativepaylogo.png';


class Navbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            searchTerm: 'Search jobs'
        };
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    handleToggle = () => this.setState({open: !this.state.open});
     
    handleClose = () => this.setState({open: false});

    handleSearchClick = () => {
        this.props.removeSalaries();
        this.props.updateSalaries(this.state.searchTerm);
    }

    updateSearchTerm = (e) => {
        this.setState({searchTerm: e.target.value})      
    }

    checkEnter = (e) => {
        if(e.keyCode === 13){
            this.handleSearchClick();
            this.props.history.push('/results');
        }
    }

    searchBoxClick = () => {
        this.setState({searchTerm: ''});
    }

    render(){

        return(
            <div className='navbar-main'>
                <div className='navbar-top'>
                    <div className='navbar-top-left'>
                        <Link to='/' className='link'><img src={logo} alt="logo" className='logo'/></Link>
                        <Link to='/' className='link'><h1 className='navbar-title'>relative<span className='gold-text'>pay</span></h1></Link>
                    </div>
                    <div className='navbar-top-right'>
                        <div className='mobile-menu'>
                            <MDMenu
                                size={35}
                                color='#85bb65'                         
                                onClick={this.handleToggle}
                            />
                            <Drawer
                                docked={false}
                                width={200}
                                open={this.state.open}
                                openSecondary={true}
                                onRequestChange={(open) => this.setState({open})}
                                containerClassName='drawer'
                                >
                                <Link to='/' className='link'><MenuItem onClick={this.handleClose} className='menu-item'>Home</MenuItem></Link>
                                <Link to='/about' className='link'><MenuItem onClick={this.handleClose} className='menu-item'>About</MenuItem></Link>
                            </Drawer>
                        </div>
                        <div className="desktop-menu">
                            <Link to='/' className='link'><div className='navbar-menu-home'>Home</div></Link>
                            <Link to='/about' className='link'><div className='navbar-menu-about'>About</div></Link>
                        </div>
                    </div>
                </div>
                <div className='navbar-bottom'>
                    <div className='navbar-search-container'>
                        <Link to='/results' className='link'>                        
                            <div onClick={this.handleSearchClick}>
                                <MDSearch 
                                size={30}/>
                            </div>
                        </Link>
                        <input 
                        onClick={this.searchBoxClick.bind(this)}
                        onChange={e => this.updateSearchTerm(e)}
                        onKeyDown={e => this.checkEnter(e)}
                        value={this.state.searchTerm}
                        placeholder='Search jobs'/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        salaries: state.salaries
    }
  }
  
  export default withRouter(connect(mapStateToProps, { updateSalaries, removeSalaries })(Navbar));