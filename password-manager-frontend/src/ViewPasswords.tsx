import React, { Component } from 'react';
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
    api = new ApiService()
    auth = new AuthService(this.api)

    state: ViewPasswordState = {
        email: "",
        pswd: ""
    }

    render() {
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
