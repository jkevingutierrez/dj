import React, { Component } from 'react';
import Request from './Request';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import requestsData from '../assets/data/requests.mock.json';

const styles = theme => ({
  list: {
    margin: 20,
  },
});

class Requests extends Component {
  state = {
    open: false,
    requests: []
  };

  componentDidMount() {
    this.setState({
      requests: requestsData,
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleAccept = () => {
    this.setState({
      open: true
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid item xs={10}>
            <Paper>
              <List className={classes.list} subheader={<ListSubheader>Solicitudes pendientes</ListSubheader>}>
              {
                this.state.requests.map(request => (
                  <Request key={request.id} { ...request } handleAccept={this.handleAccept} handleReject={this.handleAccept} />
                ))
              }
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Dialog
          fullScreen={false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Se ha enviado la solicitud correctamente"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se ha registrado la solicitud
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Requests);
