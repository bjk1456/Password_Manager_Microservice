import React, { Component } from 'react';
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import { RouteComponentProps } from 'react-router-dom';
import {ApiService} from "./app/api/api.service";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import PasswordGrid from "./PasswordGrid";
import {State} from "@silevis/reactgrid/dist/lib/Model";
import {AuthService} from "./app/auth/services/auth.service";
import date from "date-and-time";
import history from './History';
import Login from "./Login";



/**
type PasswordCreationProps = {
    withProps: string
    passwords: []
    addPassword: Function
}
 */
type PasswordCreationProps = {

    endpoint: string
    addPassword: Function
    passwords: []
}

type PasswordCreationState = {

    name: string
    email: string
    pswdN: string
    pswdS: string
    website: string
}



export default class PasswordCreation extends Component<PasswordCreationProps, PasswordCreationState> {

    endpoint = this.props.endpoint;
    api = new (ApiService)
    auth = new AuthService(this.api)

    state: PasswordCreationState = {
        name: "",
        email: "",
        pswdN: "",
        pswdS: "",
        website: ""
    }




    /**
    componentDidMount() {
        fetch('https://api.myjson.com/bins/15psn9')
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    }
 */

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

    handleWebsite(e: any) {
        this.setState({website: e})
    }

    handleGenerateRegPassword(e: any) {
        console.log(`this.endpoint = ${JSON.stringify(this.endpoint)}`)
        console.log(`this.endpoint = ${this.endpoint}`)
        //this.props.addPassword(this.state.pswdS)

        console.log(`JSON.stringify(this.endpoint) = ${JSON.stringify(this.endpoint)}`)
        if(this.endpoint === "0/api/v0/users/auth/") {
            if (this.state.name.length < 3){
                alert("The name must be AT LEAST 3 characters")
                return
            }
            if (this.state.email.length < 5){
                alert("The email must be AT LEAST 5 characters")
                return
            }
        } else{
            if (this.state.website.length < 3){
                alert("The website must be AT LEAST 5 characters")
                return
            }
        }
        if((this.state.pswdN.length < 5) || (this.state.pswdS.length < 5)){
            alert("The password length must be AT LEAST 5 characters")
            return
        }
        if(this.state.pswdN != this.state.pswdS){
            alert("The passwords MUST BE equal")
            return
        }
        console.log(`this.auth.getTokenInStorage() == ${this.auth.getTokenInStorage()}`)

        if(window.location.pathname === "/createRegularPassword") {
            if((this.auth.getTokenInStorage()) && (this.api.getToken() == null)) {
                console.log(`getTokenInStorage() == ${this.auth.getTokenInStorage()}`)
                console.log(`this.api.getToken() == ${this.api.getToken()}`)
                this.api.setAuthToken(this.auth.getTokenInStorage())
            }
        this.api.post(this.endpoint,{"password": this.state.pswdS,"website": this.state.website,"email": this.state.email}).then((reply: any) => {
            console.log(`the reply is ${reply.toString()}`)

                this.props.addPassword({
                    password: this.state.pswdS,
                    website: this.state.website,
                    dateCreated: new Date()
                })

        }).catch(error => alert(error.message))
}
        if(window.location.pathname === "/createMasterPassword") {
            const updatedEndpoint = "0/api/v0/users/auth/"
            this.api.post(updatedEndpoint,{"password": this.state.pswdS,"website": this.state.website,"email": this.state.email}).then((reply: any) => {
                console.log(`the reply is ${reply.toString()}`)
            })
            history.push("/")
        }





}

    handleGenerateRandom(){
        const generator = require('generate-password');
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        this.setState({pswdN: password})
        this.setState({pswdS: password})
    }

    render() {
        return (
            <div className='password-creation'>
                {window.location.pathname === "/createMasterPassword" ? (
                <h2 className="create-master-password">Create Master Password</h2>
                    ) : (<h2 className="create-regular-password">Create Regular Passwords</h2>)}
                <ol className='books-grid'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <form>
                                    <div className="grey-text">
                                        {window.location.pathname === "/createMasterPassword" ? (
                                            <React.Fragment>
                                        <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                                  success="right"
                                                  onChange = {(event) =>
                                                      this.handleName((event.target as HTMLTextAreaElement).value)}
                                                  value = {this.state.name}/>
                                        <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                                  success="right"
                                                  onChange = {(event) =>
                                                      this.handleEmail((event.target as HTMLTextAreaElement).value)}
                                                  value = {this.state.email}/>

                                        <MDBInput label="Website" icon="lock" group type="text" validate
                                                  onChange = {(event) =>
                                                      this.handleWebsite((event.target as HTMLTextAreaElement).value)}
                                                  value = {this.state.website}/>
                                        <MDBInput label="Your password" icon="lock" group type="text" validate
                                                  onChange = {(event) =>
                                                      this.handlePswdN((event.target as HTMLTextAreaElement).value)}
                                                  value = {this.state.pswdN}/>
                                        <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="text" validate
                                                  error="wrong" success="right"
                                                  onChange = {(event) =>
                                                      this.handlePswdS((event.target as HTMLTextAreaElement).value)}
                                                  value = {this.state.pswdS}/>
                                        <div className="text-center">
                                            <MDBBtn onClick= {(event) =>
                                                this.handleGenerateRegPassword((event.target as HTMLTextAreaElement).value)} color="primary">Create</MDBBtn>
                                            <MDBBtn onClick= {(event) =>
                                                this.handleGenerateRandom()} color="primary">Generate Random</MDBBtn>
                                        </div>
                                            </React.Fragment>

                                        ) : (<div className="text-center">
                                                {this.auth.getTokenInStorage() ? (
                                                    <React.Fragment>
                                                        <MDBInput label="Website" icon="lock" group type="text" validate
                                                                  onChange = {(event) =>
                                                                      this.handleWebsite((event.target as HTMLTextAreaElement).value)}
                                                                  value = {this.state.website}/>
                                                        <MDBInput label="Your password" icon="lock" group type="text" validate
                                                                  onChange = {(event) =>
                                                                      this.handlePswdN((event.target as HTMLTextAreaElement).value)}
                                                                  value = {this.state.pswdN}/>
                                                        <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="text" validate
                                                                  error="wrong" success="right"
                                                                  onChange = {(event) =>
                                                                      this.handlePswdS((event.target as HTMLTextAreaElement).value)}
                                                                  value = {this.state.pswdS}/>
                                                        <MDBBtn onClick= {(event) =>
                                                            this.handleGenerateRegPassword((event.target as HTMLTextAreaElement).value)} color="primary">Create</MDBBtn>
                                                        <MDBBtn onClick= {(event) =>
                                                            this.handleGenerateRandom()} color="primary">Generate Random</MDBBtn>
                                                    </React.Fragment>
                                                    ) : (  <React.Fragment>
                                                    <Login addPassword={this.props.addPassword}/>
                                                </React.Fragment>)}

                                        </div>)}

                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    {this.props.passwords ? (
                    <div>
                        <PasswordGrid passwords={this.props.passwords}/>
                    </div>
                    ) : ( <> ... </>)}
                </ol>
            </div>
        )}
}


