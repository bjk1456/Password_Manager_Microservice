import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import Login from './Login'

class ViewPasswords extends Component {
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
                <Login/>
            </div>
        )}
}

export default ViewPasswords
