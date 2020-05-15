import React from 'react'
import { Link, Route } from 'react-router-dom'
import { RouteWithProps } from 'react-router-util'
import {createBrowserHistory} from 'history';
import PasswordCreation from './PasswordCreation'
import ViewPasswords from './ViewPasswords'
import './App.css'
import Button from '@material-ui/core/Button';


export const history = createBrowserHistory({forceRefresh:true})

export default class PasswordManagerApp extends React.Component {
    state = {
        passwords: []
    };

    addPassword = (password) => {
        this.setState({passwords: this.state.passwords.concat(password)})
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
                 component = {PasswordCreation}  endpoint="/users/auth/"/>
          <RouteWithProps exact path = "/createRegularPassword"
                 component = {PasswordCreation}  endpoint="/password/store"  addPassword={this.addPassword} passwords={this.state.passwords}/>
          <RouteWithProps exact path = "/viewPasswords"
                 component = {ViewPasswords} addPassword={this.addPassword} passwords={this.state.passwords}/>
        </div>)}
}