import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";

class Login extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onAddBookChoice: PropTypes.func.isRequired,
        heading: PropTypes.string
    }

    state = {
        email: "",
        pswd: "",
    }

    handleEmail(e) {
        this.setState({email: e})
    }

    handlePswd(e) {
        this.setState({pswd: e})
    }

    handleSubmit(e) {
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
                                            this.handleSubmit(event.target.value)} color="indigo" type="submit">Login</MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
            </div>
        )}
}

export default Login
