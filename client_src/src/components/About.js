import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  h3: {
      marginLeft: '260px',
      marginTop: '20px',
      marginRight: '260px',
  },
  subtitle1: {
    marginLeft: '260px',
    marginTop: '20px',
    marginRight: '260px'
}
});

class About extends Component{
  render() {
    const { classes } = this.props;
    
    return (
        <div>
            <Typography variant="h3" color="inherit" noWrap className={classes.h3}>
                About
            </Typography>
            <Typography variant="subtitle1" color="inherit" className={classes.subtitle1}>
                Esta aplicación se encuentra en desarrollo.
            </Typography>
            <Typography variant="subtitle1" color="inherit" className={classes.subtitle1}>
                Actualmente solo tiene una aplicación para la carga de Horas. Conocida como Time Tracker. Sigo escribiendo a ver donde se corta.
            </Typography>
        </div>
    )
  }
}

export default withStyles(styles)(About);
