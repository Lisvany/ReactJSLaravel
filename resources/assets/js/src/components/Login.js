import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';

import Instance from '../utils'

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

    }

    handleSubmit() {
        const { email, password } = this.state;
        let $this=this;
        Instance.post(`/login`, {
            email: email,
            password: password
        }).then(function (res) {
            Swal({
                title: 'Info',
                text:'Login succesfully!',
                type: 'success',
                timer: 3000
            });
            console.log(res.data)
            const { access_token }= res.data;
            localStorage.setItem('userToken', `Bearer ${access_token}`);
            $this.props.history.push('/');
            Instance.changeToken(`Bearer ${access_token}`);
        }).catch(function (error) {
            console.log(error);
        });
    }    

    render() {
        const { error } = this.state;
        const { userToken } = localStorage;
        
        if(!userToken || (userToken === null) || (userToken === "")){
            
            return (
                <div className="container is-fluid" style={{width: 450}} >
                    
                    <div className="box is-fluid" style={{marginTop: 20}}>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left">
                                <input 
                                    autoFocus
                                    className="input" 
                                    type="email" 
                                    name='email'
                                    placeholder="Email" 
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className='control has-icons-left'>
                                <input 
                                    className={error ? 'input is-danger' : 'input'}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password} 
                                    onChange={this.handleChange}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <p style={error ? {display: 'block'} : {display: 'none'}} className="help is-danger">This email is invalid</p>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button onClick={this.handleSubmit} className="button is-success">Submit</button>
                            </div>
                            <div className="control">
                                <a onClick={()=> this.setState({email:'', password: ''}) } className="button is-link">Clear</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to="/" />
        }
    }
}
