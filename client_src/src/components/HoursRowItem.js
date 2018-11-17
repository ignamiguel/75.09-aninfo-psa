import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class HoursRowItem extends Component{
    render() {
        const { name, status, date, quantity } = this.props.item;

        return(
            <TableRow key='1'>
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{date.add(3, 'hours').format('YYYY-MM-DD')}</TableCell>
                <TableCell>{quantity}</TableCell>
            </TableRow>
        )
    }
}

export default HoursRowItem;