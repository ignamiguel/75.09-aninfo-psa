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

const defaultWorkerId = 1;

const styles = theme => ({
    root: {
        marginLeft: '19%',
        width: '73%',
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
        marginLeft: '19%',
        marginTop: '2%',
        marginRight: '19%',
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
            worker_id: {},
            task: '',
            date: '',
            quantity: ''
        }
    }

    componentWillMount() {
        this.setState({ worker_id: defaultWorkerId}, () => this.getWorkers());
    }

    getWorker(worker_id) {
        let worker = this.state.workers.filter(worker => (worker.id === worker_id));
        return worker[0].name + ' ' + worker[0].last_name;
    }

    // Gets workers data and continues with getTasks
    getWorkers() {
        axios.get(`${config.apiURL}/api/workers`)
            .then(workers => {
                workers.data.forEach(worker => {
                    this.setState({
                        workers: [...this.state.workers, worker]
                    });
                });
            })
            .then(() => this.getTasks());
    }
    // Gets tasks and continues with the getProject
    getTasks() {
        axios.get(`${config.apiURL}/api/tasks`)
            .then(tasks => {
                    tasks.data.forEach(task => {
                        this.getProject(task);
                    });
            });
    }
    // Gets project and continues with the hours
    getProject(task) {
        let project_filter = '{"where":{"id":"' + task.project_id + '"}}';
        axios.get(`${config.apiURL}/api/projects?filter=` + project_filter)
            .then(response => {
                task.project = response.data;
                this.setState({
                    tasks: [...this.state.tasks, task]
                }, () => this.getHours(task));
        });
    }
    // Get hours
    getHours(task) {
        let hour_filter = '{"where":{"task_id":"' + task.id + '"}}';
            axios.get(`${config.apiURL}/api/hours?filter=` + hour_filter)
                .then(hours => {
                    hours.data.forEach(hour => {
                        this.setState({
                            hours: [...this.state.hours, {
                                id: hour.id,
                                project: task.project[0].title,
                                name: task.name,
                                assigned_to: this.getWorker(task.assigned_worker_id),
                                status: task.status,
                                date: moment(hour.date),
                                quantity: hour.quantity
                            }]
                        }, () => this.setState({ isFetchingHours: true }))
                    })
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
                        "project": hour.project,
                        "name": hour.name,
                        "assigned_to": hour.assigned_to,
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
                            project: hour.project,
                            name: hour.name,
                            assigned_to: hour.assigned_to,
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

    getAvailableTasks() {
        return this.state.tasks.filter(task => (task.assigned_worker_id === this.state.worker_id));
    }

    render() {
        const { classes } = this.props;

        let dialog;
        
        if (this.state.isFetchingHours) {
            dialog = <AddHoursDialog
                    open={this.state.hoursModal}
                    closeFunction={this.handleCloseHourModal}
                    tasks={this.getAvailableTasks()}
                    workerId={this.state.worker_id}
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
                                <TableCell>Proyecto</TableCell>
                                <TableCell>Tarea</TableCell>
                                <TableCell>Asignada a</TableCell>
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
