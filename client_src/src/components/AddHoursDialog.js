import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input  from '@material-ui/core/Input';
import InputLabel  from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import config from '../config.json';

import moment from 'moment';
import axios from 'axios';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      top: 50,
      left: 50
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      }
  });

class AddHoursDialog extends Component {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            taskErrorText: '',
            dateErrorText: '',
            quantityErrorText: '',
            task: '',
            date: '',
            quantity: ''
            
        }
    }

    clearErrorMessages() {
        this.setState({
            taskErrorText: '',
            dateErrorText: '',
            quantityErrorText: ''
        })
    }

    validateTask(value) {
        if (value === '') {
            this.setState({ taskErrorText: 'Tarea es obligatoria' })
        } else {
            this.setState({ taskErrorText: '' })
        }
    }

    validateQuantity(element) {
        if (element.value <= 0) {
            this.setState({ quantityErrorText: 'Cantidad debe ser mayor a 0.' })
        } else if (element.value > 24) {
            this.setState({ quantityErrorText: 'Cantidad no puede superar 24 horas.'})
        } else {
            this.setState({ quantityErrorText: '' })
        }
    }

    validateDate(element) {
        if (element.value === '') {
            this.setState({ dateErrorText: 'Fecha es obligatoria.' });
        } else if (element.value > moment().format('YYYY-MM-DD')) {
            this.setState({ dateErrorText: 'Fecha no puede superar la fecha actual.' })
        } else {
            this.setState({ dateErrorText: '' })
        }
    }

    onTaskNameChange(event) {
        const { target: { value } } = event;
        this.setState({ task: value});
        this.validateTask(value);
    }

    onDateChange(event) {
        this.validateDate(event.target);
    }

    onQuantityChange(event) {
        if (event.target.value !== '') {
            this.validateQuantity(event.target);
        }
    }

    handleCancel = (closeFunction) => {
        this.clearErrorMessages();
        closeFunction();
    }

    handleSave = (data, closeFunction, event) => {        
        let error = false;

        if (data.task_id === '') {
            this.validateTask(data.task_id);
            error = true;
        }
        
        if (data.quantity.value === '') {
            this.validateQuantity(data.quantity);
            error = true;
        }
        
        if (!error) {
            data.quantity = data.quantity.value;
            data.date = data.date.value;
    
            axios.request({
                method: 'post',
                url: `${config.apiURL}/api/tasks/` + data.task_id + '/loadHours',
                data: data
            }).then(() => {
                closeFunction();
                window.location.reload();
            }).catch(err => {
                this.setState({ taskErrorText: err.response.data.error.message });
            });
            
        }
    };
    
    render() {
        const { open, closeFunction, workerId, tasks, classes } = this.props;
        this.tasks = {tasks};

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={closeFunction}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Carga de Horas</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" color="inherit">
                            Complete los campos requeridos para registrar su trabajo.
                        </Typography>
                        <FormControl className={classes.formControl} >
                            <InputLabel>Tarea</InputLabel>
                            <Select
                                onChange={this.onTaskNameChange.bind(this)}
                                error={!!this.state.taskErrorText}
                                input={<Input name="task" id="task-selector" />}
                                value={this.state.task}
                            >
                                {tasks.map( task => {
                                    return(
                                        <MenuItem key={task.id} value={task.id}>{task.name}</MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{this.state.taskErrorText}</FormHelperText>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required={true}
                            label="Fecha"
                            id="date"
                            type="date"
                            inputRef={el => this.setState({ date: el})}
                            fullWidth
                            defaultValue={moment().format('YYYY-MM-DD')}
                            error ={!!this.state.dateErrorText}
                            helperText={this.state.dateErrorText}
                            onChange={this.onDateChange.bind(this)}
                            InputProps={{ inputProps: { max: moment().format('YYYY-MM-DD')} } }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="normal"
                            required={true}
                            label="Cantidad"
                            id="quantity"
                            type="number"
                            inputRef={el => this.setState({ quantity: el })}
                            fullWidth
                            defaultValue="8"
                            error ={!!this.state.quantityErrorText}
                            helperText={this.state.quantityErrorText}
                            onChange={this.onQuantityChange.bind(this)}
                            InputProps={{ inputProps: { min: 1, max: 24 } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel.bind(this, closeFunction)} color="primary">
                            Cancelar
                        </Button>
                        <Button 
                            color="primary"
                            onClick={this.handleSave.bind(
                                    null, 
                                    {
                                        "quantity": this.state.quantity,
                                        "date": this.state.date,
                                        "worker_id": workerId,
                                        "task_id": this.state.task
                                    },
                                    closeFunction)}>
                            Crear
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(AddHoursDialog);