import React, {Component} from 'react';
import HoursRowItem from './HoursRowItem';
import AddHoursDialog from './AddHoursDialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import config from '../config.json';

import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
import moment from 'moment';

const workerId = 1;

const styles = theme => ({
    root: {
        marginLeft: '20%',
        width: '70%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    button: {
      position: 'fixed',
      margin: theme.spacing.unit,
      bottom: theme.spacing.unit,
      right: theme.spacing.unit,
    },
    h3: {
        marginLeft: '20%',
        marginTop: '2%',
        marginRight: '20%',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    }    
  });

class Hours extends Component{
    
    constructor() {
        super();
        this.state = {
            tasks: [],
            workers: [],
            hours: [],
            hoursModal: false,
            isFetchingHours: false,
            task: '',
            date: '',
            quantity: ''
        }
    }

    componentWillMount() {
        this.getHours();
    }

    getHours() {
        let task_filter = '{"where":{"assigned_worker_id":"' + workerId + '"}}';
        axios.get(`${config.apiURL}/api/tasks?filter=` + task_filter)
            .then(response => {
                    response.data.forEach(task => {
                        this.setState({
                            tasks: [...this.state.tasks, task]
                        });
                        task.hour_ids.forEach(hour => {
                            axios.get(`${config.apiURL}/api/tasks/` + task.id + '/hours/' + hour)
                                .then(response => {
                                    this.setState({
                                        hours: [...this.state.hours, {id: response.data.id, name: task.name, status: task.status, date: moment(response.data.date), quantity: response.data.quantity}]
                                    }, () => this.setState({ isFetchingHours: true }))
                            })
                        })
                    });
            });
    }

    handleOpenHourModal = () => {
        this.setState({ hoursModal: true });
    };
    
    handleCloseHourModal = () => {
        this.setState({ hoursModal: false });
    };

    formatHour(hour) {
        return moment(hour).add(3, 'hours').format('YYYY-MM-DD');
    }

    groupHours() {
        let groupedHours = [];
        if (this.state.isFetchingHours) {
            this.state.hours.forEach((hour) => {
                let transformedHour = this.formatHour(hour.date);
                if (groupedHours.length === 0) {
                    groupedHours.push({
                        "id": hour.id,
                        "name": hour.name,
                        "status": hour.status,
                        "date": transformedHour,
                        "quantity": hour.quantity
                    });
                } else {
                    let hourFound = false;
                    groupedHours.forEach(groupedHour => {
                        if (((groupedHour.date) === transformedHour) && (groupedHour.name === hour.name)) {
                            hourFound = true;
                            groupedHour.quantity += hour.quantity;
                        }
                    });
                    if (!hourFound) {
                        groupedHours.push({
                            id: hour.id,
                            name: hour.name,
                            status: hour.status,
                            date: transformedHour,
                            quantity: hour.quantity
                        });
                    }
                }                
            });
            groupedHours.sort((a, b) => {
                if (a.name !== b.name) {
                    if (a.name > b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                if (a.date >= b.date) {
                    return -1;
                } else {
                    return 1;
                }
            });
        }
        return groupedHours;
    }

    render() {
        const { classes } = this.props;

        let dialog;
        
        if (this.state.isFetchingHours) {
            dialog = <AddHoursDialog
                    open={this.state.hoursModal}
                    closeFunction={this.handleCloseHourModal}
                    tasks={this.state.tasks}
                    workerId={workerId}
                />       
        } else {
            dialog = (<Dialog open={this.state.hoursModal}>
                <CircularProgress className={classes.progress}/>
            </Dialog>)
        }

        const hours = this.groupHours().map((hour, i) => {
            return(
                <HoursRowItem item={hour} key={hour.id}/>
            )
        })
        
        return (
            <div>
                <Typography variant="h3" color="inherit" className={classes.h3}>
                    Horas
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tarea</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Horas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hours}
                        </TableBody>
                    </Table>
                </Paper>
                <Button 
                    variant="fab" 
                    color="primary"
                    aria-label="Add"
                    className={classes.button}
                    onClick={this.handleOpenHourModal}
                >
                    <AddIcon />
                </Button>
                {dialog}
            </div>
        )
    }
}

export default withStyles(styles)(Hours);
