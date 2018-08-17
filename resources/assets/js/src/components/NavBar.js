import React, { Component } from 'react'

export default class NavBar extends Component {

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(){
        localStorage.removeItem('userToken');
        // this.props.history.push('/login');
        this.props.navigation.push('/login');

    }

  render() {
    return (
        <nav style={{marginBottom: 25}} className="navbar is-transparent">
            <div className="navbar-brand">
                <a className="navbar-item" href="#">
                    Simple Task Laravel & ReactJS
                </a>
                <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        
            <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-end">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                {
                                    this.props.user ? this.props.user.name : 'Anonymous' 
                                }
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <a onClick={this.handleSubmit} className="navbar-item is-active">
                                    Log Out
                                </a>
                            </div>
                        </div>
                </div>
            </div>
        </nav>
    )
  }
}
