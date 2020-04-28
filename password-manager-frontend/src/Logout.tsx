import React from "react";
import Button from '@material-ui/core/Button';
import {AuthService} from "./app/auth/services/auth.service";
import {ApiService} from "./app/api/api.service";

export default class Logout extends React.Component<any, any> {


    api = new (ApiService)
    auth = new AuthService(this.api)

    handleLogout(e: any) {
        this.auth.logout()
    }

    render() {
        return <div>
            <Button variant="contained" onClick = {(event) =>
                this.handleLogout((event.target as HTMLTextAreaElement).value)}>Logout</Button>
        </div>;
    }
}
