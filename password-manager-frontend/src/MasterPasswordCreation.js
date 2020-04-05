import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";

class MasterPasswordCreation extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onAddBookChoice: PropTypes.func.isRequired,
        heading: PropTypes.string
    }

    state = {
        name: "",
        email: "",
        pswdN: "",
        pswdS: ""
    }

    handleName(e) {
        this.setState({name: e})
    }

    handleEmail(e) {
        this.setState({email: e})
    }

    handlePswdN(e) {
        this.setState({pswdN: e})
    }

    handlePswdS(e) {
        this.setState({pswdS: e})
    }

    handleRegister(e) {
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
                    <h2 className="create-password">Create Master Password</h2>
                    <ol className='books-grid'>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="6">
                                    <form>
                                        <p className="h5 text-center mb-4">Sign up</p>
                                        <div className="grey-text">
                                            <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                                      success="right"
                                                      onChange = {(event) =>
                                                    this.handleName(event.target.value)}
                                                      value = {this.state.name}/>
                                            <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                                      success="right"
                                                      onChange = {(event) =>
                                                          this.handleEmail(event.target.value)}
                                                      value = {this.state.email}/>
                                            <MDBInput label="Your password" icon="lock" group type="password" validate
                                                      onChange = {(event) =>
                                                          this.handlePswdN(event.target.value)}
                                                      value = {this.state.pswdN}/>
                                            <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate
                                                      error="wrong" success="right"
                                                      onChange = {(event) =>
                                                          this.handlePswdS(event.target.value)}
                                                      value = {this.state.pswdS}/>
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn onClick= {(event) =>
                                                this.handleRegister(event.target.value)} color="primary">Register</MDBBtn>
                                        </div>
                                    </form>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </ol>
                </div>
            )}
}

export default MasterPasswordCreation
