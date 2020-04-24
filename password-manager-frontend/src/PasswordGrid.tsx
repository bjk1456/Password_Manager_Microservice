import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";

interface PasswordGridProps {

    passwords: []
}

export default class PasswordGrid extends Component<PasswordGridProps> {



    rowData: any = this.props.passwords

    handleProps(){
        console.log(`the JSON.stringify(this.rowData.indexOf(0)['password'] is ${JSON.stringify(this.rowData.indexOf(0))}`)
        console.log(`rowData is ${JSON.stringify(this.rowData)}`)

        this.rowData.forEach((r) => {
            console.log(`inside r it is ... JSON.stringify(r)  ${JSON.stringify(r)}`)
        })

    }

    render() {

        const columnDefs = [
            {headerName: 'Password', field: 'password', width: 150, filter: 'text'}
        ]

        this.handleProps()

        const rowdata = [{ password: "(ThisIsJebPassword" },
            { password: "(CnnSucksPassword" }]

        const rowProps = this.props.passwords

        alert(rowdata[0]['password'])


        return (

            <div className='password-grid'  style={{height: '700px', width: '800px'}}>
                <div
                    className="ag-theme-balham"
                    style={{height: '500px', width: '600px'}}
                >
                <AgGridReact

                    columnDefs={columnDefs}
                    rowData={this.rowData[0]}>

                </AgGridReact>
            </div>
            </div>
    )
    }
}
