import React, { Component } from 'react';

import NavBar from './NavBar'
import List from './List'

import { Redirect } from 'react-router-dom'

const Swal = require('sweetalert2')

import Instance from '../utils';

export default class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
            editform: false,
            name: '',
            description: '',
            item: null,
            user: null
        }

        this.addTask = this.addTask.bind(this);
        this.delTask = this.delTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.getUser = this.getUser.bind(this);

    }

    getUser(){
        let $this=this;

        if(!this.user){
            try {
                Instance.post('/me')
                        .then(res => {
                            $this.setState({
                                user: res.data
                            })
                        })
            } catch (error) {
                console.error(error);
            }
        }

      
    }

    componentDidMount() {
        this.getTask();
        this.getUser();
       
    }

        handleChange(e){

            const { name, value } = e.target;

            this.setState(prevState => ({
                item: {
                    ...prevState.item,
                    [name]:value
                }
            }))
        }

        getTask() {

            let $this=this;

            try {
                Instance.get('/tasks')
                        .then(res => {
                            $this.setState({
                                tasks: res.data
                            })
                        })
            } catch (error) {
                console.error(error);
            }

        }

        addTask(name, description) {

            let $this=this;
       
            Instance.post('/addtask', {
                name: name,
                description: description
            }).then(function (response) {
                Swal({
                    title: 'Info',
                    text:'Added succesfully!',
                    type: 'success',
                    timer: 3000
                });
                $this.getTask();
            }).catch(function (error) {
                console.log(error);
            });
        
        }

        updateTask(){
            let $this=this;

            const { item } = this.state;
       
            Instance.post(`/edittask/${item.id}`, {
                name: item.name,
                description: item.description
            }).then(function (response) {
                Swal({
                    title: 'Info',
                    text:'Updated succesfully!',
                    type: 'success',
                    timer: 3000
                });
                $this.getTask();
            }).catch(function (error) {
                console.log(error);
            });
        }

        delTask(id){
            let $this=this;

            Swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this data!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
              }).then((result) => {
                if (result.value) {
                    Instance.delete(`/task/${id}`).then(function (response) {
                        Swal({
                            title: 'Deleted!',
                            text:'Your data has been deleted.',
                            type: 'success',
                            timer: 3000
                        });
                        $this.getTask();
                    }).catch(function (error) {
                        console.log(error);
                    });
                  
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal({
                        title: 'Cancelled',
                        text: 'Your data is safe :)',
                        type: 'error',
                        timer: 3000
                });
                }
              })
       
           
        }

        showEdit(item){

            this.setState({
                editform: true,
                item
            })
        }

        renderEditForm(){
            if(this.state.item !== null){
                return (
                    <div className={this.state.editform ? 'modal is-active' : 'modal'}>
                     <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                            <p className="modal-card-title">Edit task</p>
                            <button className="delete" onClick={()=>this.setState({editform: false, name: '', description: ''})} aria-label="close"></button>
                            </header>
                            <section className="modal-card-body">
    
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input 
                                            className="input" 
                                            type="text" 
                                            placeholder="Type a name" 
                                            name="name"
                                            value={this.state.item.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
    
                                 <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <input 
                                            className="input" 
                                            type="text" 
                                            placeholder="Type a description" 
                                            name="description"
                                            value={this.state.item.description}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
    
                            </section>
                            <footer className="modal-card-foot">
                            <button className="button is-success" onClick={() => {this.updateTask(); this.setState({isActive: false, item: null}) } } >Save</button>
                            <button className="button" onClick={()=>this.setState({editform: false, name: '', description: ''})}>Cancel</button>
                            </footer>
    
                        </div>
                        
                    </div>
                )
            }else{
                return null
            }
        }

    render() {
        const { tasks, user } = this.state;
        const { userToken } = localStorage;

        if(!userToken || (userToken === null) || (userToken === "")){
            return <Redirect to="/login" />
        }else{

            return (
                <div>
                    <NavBar navigation={this.props.history} user={user} />
                            <div style={{padding: 10}} className="container is-fluid">
                            <div  className="box">
                                <div className="content">
                                        
                                        {
                                            this.renderEditForm()
                                        }

                                        <List tasks={tasks} add={this.addTask} del={this.delTask} show={this.showEdit} />
                                </div>
                            </div>
                            </div>
                </div>
            );
        }
    }
}
