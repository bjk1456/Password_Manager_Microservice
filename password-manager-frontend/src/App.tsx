import React from 'react'
import { Link, Route } from 'react-router-dom'
import { RouteWithProps } from 'react-router-util'
import {createBrowserHistory} from 'history';
import * as BooksAPI from './BooksAPI'
import MasterPasswordCreation from './MasterPasswordCreation'
import RegularPasswordCreation from './RegularPasswordCreation'
import PasswordCreation from './PasswordCreation'
import ViewPasswords from './ViewPasswords'
import './App.css'
import Button from '@material-ui/core/Button';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import PasswordComponent from "./PasswordComponent";


export const history = createBrowserHistory({forceRefresh:true})

export default class PasswordManagerApp extends React.Component {
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
        console.log(`inside addPassword password is ${password.password}`)
        this.setState({passwords: this.state.passwords.concat(password)})
        /**
        this.setState((state) => ({
            passwords : [...this.state.passwords, password]
        }))
         */
    }

  render() {
    return (
        <div className="app">
          <Route history={history} exact path="/" render={()=> (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Button variant="contained" color="primary">
                      <Link to="/createMasterPassword">Create Master Password</Link>
                    </Button>
                    <Button variant="contained" color="secondary">
                      <Link to="/createRegularPassword">Create Regular Password</Link>
                    </Button>
                    <Button variant="contained">
                      <Link to="/viewPasswords">View Regular Passwords</Link>
                    </Button>


                  </div>
                  <div className="open-search">
                    <Link to="/search">Add a book</Link>
                  </div>
                </div>
              </div>
          )}></Route>

          <RouteWithProps exact path = "/createMasterPassword"
                 component = {PasswordCreation}  {...{endpoint: "Master" }}/>
          <RouteWithProps exact path = "/createRegularPassword"
                 component = {PasswordCreation}  endpoint="ThisIsIt"  addPassword={this.addPassword} passwords={this.state.passwords}/>
          <RouteWithProps exact path = "/viewPasswords"
                 component = {ViewPasswords} addPassword={this.addPassword} passwords={this.state.passwords}/>


        </div>)}
}


