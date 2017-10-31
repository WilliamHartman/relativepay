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

class Navbar extends Component {
    constructor(){
        super();

        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});
    
    handleClose = () => this.setState({open: false});

    handleSearchClick = () => {
        console.log('Will search and return to store')
        this.props.updateSalaries(['test']);
    }

    render(){
        return(
            <div className='navbar-main'>

                <div className='navbar-top'>
                <Link to='/'><h1 className='navbar-title'>relativepay</h1></Link>
                    <div className='navbar-top-right'>
                        <Avatar size={30}/>
                        <div>
                            <MDMenu
                            size={35}
                            onClick={this.handleToggle}
                            />
                            <Drawer
                            docked={false}
                            width={300}
                            open={this.state.open}
                            openSecondary={true}
                            onRequestChange={(open) => this.setState({open})}
                            >
                            <MenuItem onClick={this.handleClose}>Home</MenuItem>
                            <MenuItem onClick={this.handleClose}>About</MenuItem>
                            <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                            </Drawer>
                        </div>
                    </div>
                </div>
                <div className='navbar-bottom'>
                    <div className='navbar-search-container'>
                        <Link to='/results'>                        
                            <div onClick={this.handleSearchClick}>
                                <MDSearch 
                                size={30} 
                                color='#0caa41'/>
                            </div>
                        </Link>
                        <input 
                        ref='searchInput'
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
  
  export default connect(mapStateToProps, { updateSalaries })(Navbar);