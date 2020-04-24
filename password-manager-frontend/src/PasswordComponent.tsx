import React, { Component } from 'react';
import PasswordCreation from "./PasswordCreation";


export default class PasswordComponent extends Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        passwords: []
    };

    addPassword = (password) => {
        this.setState((state) => ({
            passwords : [...this.state.passwords, password]
        }))
    }
/**
    render() {
        return(
        <div>
            <PasswordCreation  endpoint="ThisIsIt"  addPassword={this.addPassword}/>
        </div>
        )
    }
 */
}