import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import PasswordCreation from "./PasswordCreation";

interface State {
    name: string;
    email: string;
    pswdN: string;
    pswdS: string;
}

export default class MasterPasswordCreation extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onAddBookChoice: PropTypes.func.isRequired,
        heading: PropTypes.string
    }

    state: State = {
        name: "",
        email: "",
        pswdN: "",
        pswdS: ""
    }

    handleName(e: any) {
        this.setState({name: e})
    }

    handleEmail(e: any) {
        this.setState({email: e})
    }

    handlePswdN(e: any) {
        this.setState({pswdN: e})
    }

    handlePswdS(e: any) {
        this.setState({pswdS: e})
    }

    handleRegister(e: any) {
        if(this.state.name.length < 3){
            alert("The name must be AT LEAST 3 characters")
            return
        }
        if(this.state.email.length < 5){
            alert("The email must be AT LEAST 5 characters")
            return
        }
        if((this.state.pswdN.length < 5) || (this.state.pswdS.length < 5)){
            alert("The password length must be AT LEAST 5 characters")
            return
        }
        if(this.state.pswdN != this.state.pswdS){
            alert("The passwords MUST BE equal")
            return
        }
    }

    render() {
        return (
            <div className='master-password-creation'>
                <PasswordCreation/>
            </div>
        )}
}

