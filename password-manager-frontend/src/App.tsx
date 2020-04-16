import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MasterPasswordCreation from './MasterPasswordCreation'
import RegularPasswordCreation from './RegularPasswordCreation'
import ViewPasswords from './ViewPasswords'
import './App.css'
import Button from '@material-ui/core/Button';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

export default class PasswordManagerApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  };

  render() {
    return (
        <div className="app">
          <Route exact path="/" render={()=> (
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
          )}/>

          <Route exact path = "/createMasterPassword"
                 component = {MasterPasswordCreation}/>
          <Route exact path = "/createRegularPassword"
                 component = {RegularPasswordCreation}/>
          <Route exact path = "/viewPasswords"
                 component = {ViewPasswords}/>


        </div>)}
}


