import React, { Component, Fragment } from 'react'

export default class List extends Component {

    constructor(props){
        super(props);

        this.state = {
            isActive: false,
            name: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    renderItems(tasks){
        if(tasks.length > 0){
            return tasks.map((item) => {
                return (
                    <tr key={item.id}>
                        <th>{item.name}</th>
                        <td>
                            {item.description}
                        </td>
                        <td>
                            <a className="button is-info is-outlined is-rounded" onClick={()=> this.props.show(item)} style={{marginRight: 5}} >
                                <span style={{marginRight: .5}} className="icon is-small">
                                    <i className="fa fa-edit"></i>
                                </span>
                                Edit
                            </a>
                            <a className="button is-danger is-outlined is-rounded" onClick={()=>this.props.del(item.id)} >
                                <span style={{marginRight: .5}} className="icon is-small">
                                        <i className="fa fa-trash"></i>
                                </span>
                                Del
                            </a>
                        </td>
                    </tr>
                )
            })
        }else{
                return (
                    <tr>
                        <th>-</th>
                        <td>
                            -
                        </td>
                        <td>
                            -
                        </td>
                    </tr>
                )
        }
    }

  render() {

    const { tasks } = this.props;
    const { isActive, name, description } = this.state;

        return (
            <div>  
                 <div className={isActive ? 'modal is-active' : 'modal'}>
                 <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">New Task</p>
                        <button className="delete" onClick={()=>this.setState({isActive: false, name: '', description: ''})} aria-label="close"></button>
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
                                        value={this.state.name}
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
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                        </section>
                        <footer className="modal-card-foot">
                        <button className="button is-success" onClick={() => {this.props.add(name, description); this.setState({isActive: false,name: '', description: ''}) } } >Add</button>
                        <button className="button" onClick={()=>this.setState({isActive: false, name: '', description: ''})}>Cancel</button>
                        </footer>

                    </div>
                    
                </div>

                <p className="is-size-3">
                    Task list
                     <a style={{ float: 'right' }} onClick={()=>this.setState({isActive: true})} className="button is-primary is-outlined is-rounded">
                            <span style={{marginRight: .5}} className="icon is-small">
                                <i className="fa fa-plus-square-o"></i>
                            </span>
                        Add task
                    </a>
                </p>

                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="Position">Name</abbr></th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderItems(tasks)
                        }
                    </tbody>
                </table>
            </div>
        )
  }
}
