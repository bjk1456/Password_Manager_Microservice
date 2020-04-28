import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";
import Logout from "./Logout";

interface PasswordGridProps {

    passwords: []
}

export default class PasswordGrid extends Component<PasswordGridProps,{}> {

    rowData: any = this.props.passwords


    handleProps(){
        console.log(`raw row data is ${this.rowData}`)
        //console.log(`the JSON.stringify(this.rowData.indexOf(0)['password'] is ${JSON.stringify(this.rowData.indexOf(0))}`)
        console.log(`rowData is ${JSON.stringify(this.rowData)}`)

        /**
        this.props.passwords.forEach((r) => {
            console.log(`inside r it is ... JSON.stringify(r)  ${JSON.stringify(r)}`)
        })
         */


    }

    combineProps(){
        this.props.passwords.forEach((p) => {

        })
    }

    render() {

        const columnDefs = [
            {headerName: 'Password', field: 'password'},{headerName: 'Website', field: 'website'},
            {headerName: 'DateCreated', field: 'dateCreated'}
        ]

        this.handleProps()

        const rowdata = [{ password: "(ThisIsJebPassword" },
            { password: "(CnnSucksPassword" }]

        const rowProps = this.props.passwords
        


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
