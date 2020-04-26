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
}



export default class PasswordCreation extends Component<PasswordCreationProps, PasswordCreationState> {

    endpoint = this.props.endpoint;
    api = new (ApiService)

    state: PasswordCreationState = {
        name: "",
        email: "",
        pswdN: "",
        pswdS: ""
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

    handleGenerateRegPassword(e: any) {
        console.log(`this.endpoint = ${JSON.stringify(this.endpoint)}`)
        console.log(`this.endpoint = ${this.endpoint}`)
        //this.props.addPassword(this.state.pswdS)
        this.props.addPassword( {password: this.state.pswdS, website: 'SteakAndCheese', dateCreated: '9-11-2001'})
        console.log(`JSON.stringify(this.endpoint) = ${JSON.stringify(this.endpoint)}`)
        if((this.state.name.length < 3) && (this.endpoint['endpoint'] === "Master")){
            alert("The name must be AT LEAST 3 characters")
            return
        }
        if((this.state.email.length < 5) && (this.endpoint['endpoint'] === "Master")){
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

        //this.api.post(this.endpoint['endpoint'],)

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
                <h2 className="create-password">Create Password</h2>
                <ol className='books-grid'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="6">
                                <form>
                                    <p className="h5 text-center mb-4">Sign up</p>
                                    <div className="grey-text">
                                        {this.endpoint['endpoint'] === "Master" ? (
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
                                            </React.Fragment>
                                            ) : ( <> ... </>)}
                                            <React.Fragment>
                                        <MDBInput label="Your password" icon="lock" group type="text" validate
                                                  onChange = {(event) =>
                                                      this.handlePswdN((event.target as HTMLTextAreaElement).value)}
                                                  value = {this.state.pswdN}/>
                                        <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="text" validate
                                                  error="wrong" success="right"
                                                  onChange = {(event) =>
                                                      this.handlePswdS((event.target as HTMLTextAreaElement).value)}
                                                  value = {this.state.pswdS}/>
                                            </React.Fragment>

                                    </div>
                                    <div className="text-center">
                                        <MDBBtn onClick= {(event) =>
                                            this.handleGenerateRegPassword((event.target as HTMLTextAreaElement).value)} color="primary">Create</MDBBtn>
                                        <MDBBtn onClick= {(event) =>
                                            this.handleGenerateRandom()} color="primary">Generate Random</MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <div>
                        <PasswordGrid passwords={this.props.passwords}/>
                    </div>
                </ol>
            </div>
        )}
}


