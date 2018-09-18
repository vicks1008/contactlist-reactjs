import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import {store, addContact, editContact} from '../flux.js';
import Main from '../components/Main.jsx';

export default class Contacts extends Flux.DashView {
    constructor(){
        super();
        this.state = {
            full_name : '',
            email : '',
            phone : '',
            address : '',
            mode: 'add'
        };
    }
    
    componentDidMount(){
        //Set mode state to edit if URL parameter ID has an id
        if(typeof this.props.match.params.id !== 'undefined') {
            const contacts = store.getState("contacts");
            const contact = contacts.find((c) => c.id == this.props.match.params.id);
            this.setState({ 
                mode: 'edit',
                full_name: contact.full_name,
                email : contact.email,
                phone : contact.phone,
                address : contact.address,
                id: contact.id
            });
        }
        //This is getting the contacts from the state & if there are contacts
        //then subscribe
        let contacts = store.getState('contacts');
        if(contacts) this.setState({contacts});
        
        this.subscribe(store, 'contacts', (contacts) => {
            this.props.history.push('/');
        });
    }
    
    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="text-center mt-5">Add a new contact</h1>
                    <form>
                        <div className="col-12 col-sm-6 col-md-3 px-0">
                            <img 
                            src="https://randomuser.me/api/portraits/men/3.jpg"
                            alt="Random Man" 
                            className="rounded-circle mx-auto d-block img-thumbnail" 
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Full Name"
                            value={this.state.full_name}
                            onChange={(nameinput) => this.setState({
                                full_name : nameinput.target.value
                            })}
                        />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            value={this.state.email}
                            onChange={(emailinput) => this.setState({
                                email : emailinput.target.value
                            })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="phone" 
                            className="form-control" 
                            placeholder="Enter phone" 
                            value={this.state.phone}
                            onChange={(phoneinput) => this.setState({
                                phone : phoneinput.target.value
                            })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" 
                            className="form-control" 
                            placeholder="Enter address" 
                            value={this.state.address}
                            onChange={(addressinput) => this.setState({
                                address : addressinput.target.value
                            })}
                            />
                        </div>
                        <button 
                        type="button" 
                        className="btn btn-primary form-control"
                        onClick={() => {
                            if(this.state.mode == 'add') addContact({ 
                            full_name : this.state.full_name, 
                            email : this.state.email, 
                            phone : this.state.phone, 
                            address : this.state.address
                            });
                            else if(this.state.mode == 'edit') editContact({ 
                            full_name : this.state.full_name,
                            email : this.state.email, 
                            phone : this.state.phone, 
                            address : this.state.address,
                            id: this.state.id
                            });
                            }
                        }
                        >save</button>
                        <Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
                    </form>
                </div>
            </div>
        );
    }
}