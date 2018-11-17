import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class NavVarOption extends Component{       
    render() {
        const { text, icon, link } = this.props;

        return (
            <ListItem button key={text} component="a" href={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        )
    }
}

NavVarOption.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired
  };

export default NavVarOption;