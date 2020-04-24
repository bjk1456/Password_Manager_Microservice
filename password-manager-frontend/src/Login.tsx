import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import { AuthService } from './app/auth/services/auth.service';
import {ApiService} from "./app/api/api.service";
import history from './History';

interface State {
    email: string;
    pswd: string;
}

type LoginProps = {
    addPassword: Function
}

export default class Login extends Component<LoginProps,{}> {
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

        const api = new ApiService()
        const auth = new AuthService(api)
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
               console.log(`the user is ${user.toString()}`)

                //this.modal.dismiss();
            }).then((data: any) => {
                this.api.get("/password/getAll").then((data: any) => {
                    console.log(`the get all data is ${JSON.stringify(data.passwords)}`)
                    const rowData1 = Array();
                    const rowData = Array();
                    data.passwords.forEach((row : any) => {

                        let a = new Array();
                        //let mapRow = new Map();
                        //let mapRow: {[password: string] : }
                        let mapRow = {}
                        console.log(`inside the build row ... it is ${row}`)
                        console.log(`inside the build row.split(",")[0]) ... it is ${row.split(",")[0]}`)
                        let pswd = row.split(",")[0].toString()
                        //{password: pswd}
                        //mapRow['password'] =  {password: pswd}

                        //mapRow.set("password", row.split(",")[0].toString())
                        //a.push({'password': val})
                        a.concat({'password': row.split(",")[0].toString()})
                        //rowData.concat({'password': row.split(",")[0].toString()})
                        rowData.push({password: pswd})
                    })
                    rowData.forEach((r) => {
                        console.log(`the r is ${r['password']}`)
                    })
                    //console.log(`SON.stringify(array) == ${JSON.stringify(rowData1)}`)
                    //console.log(`array[1] == ${rowData1[1]['password']}`)
                    /**
                    let map = {}
                    data.passwords.forEach(row =>
                    array.push(map{password: row[0]}))
                     */



                    //rowData.push({"password": "ItsASecret"})
                    this.props.addPassword(rowData);
                    //this.props.addPassword([{password:"SuperSecretPassword"},{password:"AnotherBigSecret"}])
                })
                history.push('/')
        })   .catch((e) => {
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