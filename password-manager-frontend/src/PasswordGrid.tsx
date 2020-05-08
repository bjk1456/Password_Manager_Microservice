import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";
import Logout from "./Logout";

interface PasswordGridProps {

    passwords: []
}

export default class PasswordGrid extends Component<PasswordGridProps,{}> {


    render() {
        const columnDefs = [
            {headerName: 'Password', field: 'password'},{headerName: 'Website', field: 'website'},
            {headerName: 'DateCreated', field: 'dateCreated'}
        ]

        return (
            <div className='password-grid'>
                <div
                    className="ag-theme-balham"
                    style={{height: '500px', width: '600px'}}
                >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={this.props.passwords}>

                </AgGridReact>
            </div>
                <Logout>
                </Logout>
            </div>
    )
    }
}
