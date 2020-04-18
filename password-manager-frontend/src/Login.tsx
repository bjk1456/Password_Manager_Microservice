import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import { AuthService } from './app/auth/services/auth.service';
import {ApiService} from "./app/api/api.service";

interface State {
    email: string;
    pswd: string;
}

export default class Login extends Component {
    api = new (ApiService)
    auth = new AuthService(this.api)
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

        const auth = new AuthService(new ApiService)
        if(this.state.email.length < 3){
            alert("The name must be AT LEAST 3 characters")
            return
        }
        if(this.state.pswd.length < 5){
            alert("The password length must be AT LEAST 5 characters")
            return
        }

        this.auth.login(
            this.state.email,
            this.state.pswd)
            .then((user: any) => {
               console.log(`the user is ${user}`)
                //this.modal.dismiss();
            })
            .catch((e) => {
                //this.error = e.statusText;
                alert(e.statusText)
                throw e;
            });
    }

    async handleGetPasswords(e: any) {

        //const api = new ApiService();
        const all = await this.api.get('/password/getAll');
        //const rows = all.passwords;
        console.log(`the rows of data are ${all.passwords}`)



    }

    render() {
        return (
            <div className='view-passwords'>
            <h2 className="view-password">Login</h2>
            <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
            <form>
                <p className="h4 text-center mb-4">Sign in</p>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Your email
        </label>
        <input type="email" id="defaultFormLoginEmailEx" className="form-control"
        onChange = {(event) =>
        this.handleEmail(event.target.value)}
        value = {this.state.email}/>
        <br />
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
            Your password
        </label>
        <input type="password" id="defaultFormLoginPasswordEx" className="form-control"
        onChange = {(event) =>
        this.handlePswd(event.target.value)}
        value = {this.state.pswd}/>
        <div className="text-center mt-4">
        <MDBBtn onClick= {(event) =>
        this.handleSubmit((event.target as HTMLTextAreaElement).value)} color="indigo" >Login</MDBBtn>
            </div>
                <div className="text-center mt-4">
                    <MDBBtn onClick= {(event) =>
                        this.handleGetPasswords((event.target as HTMLTextAreaElement).value)} color="indigo" >Get Passwords</MDBBtn>
                </div>
            </form>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
            </div>
    )}
}