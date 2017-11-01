import React, { Component } from 'react';
import './Navbar.css';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MDMenu from 'react-icons/lib/md/menu.js';
import MDSearch from 'react-icons/lib/md/search.js';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSalaries } from './../../ducks/reducer';
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
        console.log('Will search and return to store')
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
                        <img src={logo} alt="logo" className='logo'/>
                        <Link to='/'><h1 className='navbar-title'>relative<span className='gold-text'>pay</span></h1></Link>
                    </div>
                    <div className='navbar-top-right'>
                        <Avatar size={30}/>
                        <div>
                            <MDMenu
                            size={35}
                            color='white'                         
                            onClick={this.handleToggle}
                            />
                            <Drawer
                            docked={false}
                            width={300}
                            open={this.state.open}
                            openSecondary={true}
                            onRequestChange={(open) => this.setState({open})}
                            containerClassName='drawer'
                            >
                            <Link to='/'><MenuItem onClick={this.handleClose} className='menu-item'>Home</MenuItem></Link>
                            <MenuItem onClick={this.handleClose} className='menu-item'>About</MenuItem>
                            <MenuItem onClick={this.handleClose} className='menu-item'>Settings</MenuItem>
                            </Drawer>
                        </div>
                    </div>
                </div>
                <div className='navbar-bottom'>
                    <div className='navbar-search-container'>
                        <Link to='/results'>                        
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

    mainRender(){
        
    }
}

function mapStateToProps(state){
    return {
        salaries: state.salaries
    }
  }
  
  export default withRouter(connect(mapStateToProps, { updateSalaries })(Navbar));