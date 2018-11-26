import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Core
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HelpIcon from '@material-ui/icons/Help'
import MenuIcon from '@material-ui/icons/Menu';
import TimerIcon from '@material-ui/icons/AvTimer';

import NavBarOption from './NavBarOption';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    loginButton: {
        marginLeft: 12,
        marginRight: 20,
      },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });

class NavBar extends Component{
    state = {
        leftMenuOpen: false,
        loginMenuOpen: false,
        anchorEl: null,
      };
    
    handleDrawerOpen = () => {
        this.setState({ leftMenuOpen: true });
    };
    
    handleDrawerClose = () => {
        this.setState({ leftMenuOpen: false });
    };

    handleLoginOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleLoginClose = () => {
        this.setState({ anchorEl: null });
    };

    render(){
        const { classes, theme } = this.props;
        const { leftMenuOpen, anchorEl } = this.state;
        const loginMenuOpen = Boolean(anchorEl);

        return (
            <div>
            <AppBar position="static" className={classNames(classes.appBar, {
                [classes.appBarShift]: leftMenuOpen,
            })}>
                <Toolbar disableGutters={!leftMenuOpen}>
                    <IconButton 
                        color="inherit"
                        aria-label="Menu"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, leftMenuOpen && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.grow}>
                        PSA - Time Tracker
                    </Typography>
                    <div>
                        <IconButton
                        aria-owns={loginMenuOpen ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleLoginOpen}
                        color="inherit"
                        className={classes.loginButton}
                    >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={loginMenuOpen}
                        onClose={this.handleLoginClose}
                        >
                            <MenuItem onClick={this.handleLoginClose}>Perfil</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={leftMenuOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <ListItem button key='Cerrar Menú' onClick={this.handleDrawerClose}>
                        <ListItemText primary='Cerrar Menú' />
                    </ListItem>
                </div>
                <Divider />
                    <List>
                        <NavBarOption text='Horas' icon= {<TimerIcon />} link="/"/>
                    </List>
                <Divider />
                    <List>
                        <NavBarOption text='Información' icon= {<HelpIcon />} link="/about"/>
                    </List>
            </Drawer>
            </div>
        )
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
export default withStyles(styles, { withTheme: true })(NavBar);
