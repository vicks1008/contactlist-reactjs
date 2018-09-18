import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import {store, deleteContact} from '../flux.js';

import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import avatar1 from '../../img/user_1.jpg';

export default class Contacts extends Flux.DashView {
    constructor(){
        super();
        this.state = {
            showModal: false,
            contacts: []
        };
    }
    
    componentDidMount(){
        //This is getting the contacts from the state & if there are contacts
        //then subscribe
        let contacts = store.getState('contacts');
        if(contacts) this.setState({contacts});
        this.subscribe(store, 'contacts', (contacts) => {
            this.setState({ contacts });
        });
    }
    
    render() {
        const cards = this.state.contacts.map((c, i) => {
            return <ContactCard 
            key={i} 
            data={c}
            onDelete={(contact) => 
                deleteContact(contact)
            }
            />;
        });
        return (
            <div className="container">
                <div>
                    <h1 className="text-center m-5">React & Flux Contact List</h1>
                    <p className="text-center my-3">
                        <Link className="btn btn-success" to="/add">Add new contact</Link>
                    </p>
                    <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                        <ul className="list-group pull-down" id="contact-list">
                            {cards}
                        </ul>
                    </div>
                </div>
                <Modal show={this.state.showModal} onClose={() => this.setState({showModal: false})} />
            </div>
        );
    }
}