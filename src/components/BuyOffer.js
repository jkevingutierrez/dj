import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

class Request extends Component {
  render() {
    const { classes, date, location, type, weight, handleAccept, handleReject } = this.props;
    return (
      <ListItem>
        <ListItemText
          primary={`Solicitud de COMPRA de ${weight} de ${type} en ${location
            .charAt(0)
            .toUpperCase() + location.slice(1).toLowerCase()} para ${date}`}
        />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleAccept}
          >
            Aceptar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleReject}
          >
            Rechazar
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styles)(Request);
