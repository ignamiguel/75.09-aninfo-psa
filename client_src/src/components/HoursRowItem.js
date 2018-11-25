import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class HoursRowItem extends Component{
    render() {
        const { project, name, assigned_to, status, date, quantity } = this.props.item;

        return(
            <TableRow key='1'>
                <TableCell>{project}</TableCell>
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell>{assigned_to}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{quantity}</TableCell>
            </TableRow>
        )
    }
}

export default HoursRowItem;