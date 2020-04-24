import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import Login from './Login'
import { AuthService } from './app/auth/services/auth.service';
import {ApiService} from "./app/api/api.service";
import PasswordGrid from "./PasswordGrid";


type ViewPasswordState = {
    email: string;
    pswd: string;
}

type ViewPasswordProps = {
    addPassword: Function
    passwords: []
}

export default class ViewPasswords extends Component<ViewPasswordProps,ViewPasswordState> {
    api = new (ApiService)
    auth = new AuthService(this.api)

    state: ViewPasswordState = {
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
        console.log(this.auth.getTokenInStorage())
        console.log(this.auth.getTokenInStorage()  == null)
        console.log(`the passwords are ${this.props.passwords}`)
        //const login = this.auth.getTokenInStorage()  == null ? <Login/> : <Login/>
        //console.log(`the login is ${login}`)
        //const token = this.auth.getTokenInStorage();
        return (

            <div className='view-passwords'>
                {this.auth.getTokenInStorage() == null ? (
                    <Login addPassword={this.props.addPassword}/>
                ) : (
                    <div>
                        <PasswordGrid passwords={this.props.passwords}/>
                    </div>
                )}
            </div>


        )}
}
