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
                                                      success="right" />
                                            <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                                      success="right" />
                                            <MDBInput label="Confirm your email" icon="exclamation-triangle" group type="text" validate
                                                      error="wrong" success="right" />
                                            <MDBInput label="Your password" icon="lock" group type="password" validate />
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn color="primary">Register</MDBBtn>
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
