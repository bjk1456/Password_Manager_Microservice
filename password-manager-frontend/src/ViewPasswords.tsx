import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import Login from './Login'

interface State {
    email: string;
    pswd: string;
}

export default class ViewPasswords extends Component {


    state: State = {
        email: "",
        pswd: ""
    }

    handleEmail(e: any) {
        this.setState({email: e})
    }

    handlePswd(e: any) {
        this.setState({pswd: e})
    }

    handleSubmit(e: any) {
        if(this.state.email.length < 3){
            alert("The name must be AT LEAST 3 characters")
            return
        }
        if(this.state.pswd.length < 5){
            alert("The password length must be AT LEAST 5 characters")
            return
        }
    }

    render() {
        return (
            <div className='view-passwords'>
                <Login/>
            </div>
        )}
}
