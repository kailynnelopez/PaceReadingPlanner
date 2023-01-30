import React, {Component} from "react";
// import {useState} from 'react';
import Form from './Form.jsx';
import '../styles/Results.css';

class App extends Component {
	render() {
		var heading = ['Day', 'Pages to Read'];
		var body = 

			[['Kapil', 'Jaipur'],
			['Aakash', 'Hisar'],
			['Mani', 'Ranchi'],
			['Yash', 'Udaipur']

			];
      
		return (
			<div >
				<Table heading={heading} body={body} />,
			</div>
		);

	}
}

class Table extends Component {
	render() {
		var heading = this.props.heading;
		var body = this.props.body;
		return (
			<table style={{ width: 500 }}>
				<thead>
					<tr key='row'>
						{heading.map(head => <th>{head}</th>)}
					</tr>
				</thead>
				<tbody>
					{body.map(row => <TableRow row={row} />)}
				</tbody>
			</table>
		);
	}
}

class TableRow extends Component {
	render() {
		var row = this.props.row;
		return (
			<tr>
				{row.map(val => <td>{val}</td>)}
			</tr>
		)
	}
}

export default App;
