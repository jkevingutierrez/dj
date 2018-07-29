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
import boData from '../assets/data/buyOffers.mock.json';

const styles = (theme) => ({
  list: {
    margin: 20
  }
});

class Requests extends Component {
  state = {
    open: false,
    requests: [],
    buyOffers: []
  };

  componentDidMount() {
    this.setState({
      requests: requestsData,
      buyOffers: boData
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
      requests: [...this.state.requests.slice(1)]
    });
  };

  handleAccept = () => {
    this.setState({
      open: true,
      requests: [...this.state.requests.slice(1)]
    });
  };

  handleAcceptBO = () => {
    this.setState({
      open: true,
      requests: [...this.state.buyOffers.slice(1)]
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid item xs={10}>
            <Paper>
              <List
                className={classes.list}
                subheader={<ListSubheader>Solicitudes de RECOLECCIÓN pendientes</ListSubheader>}
              >
                {this.state.requests.map((request) => (
                  <Request
                    key={request.id}
                    {...request}
                    handleAccept={this.handleAccept}
                    handleReject={this.handleAccept}
                  />
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              <List
                className={classes.list}
                subheader={<ListSubheader>Solicitudes de COMPRA pendientes</ListSubheader>}
              >
                {this.state.buyOffers.map((request) => (
                  <Request
                    key={request.id}
                    {...request}
                    handleAccept={this.handleAcceptBO}
                    handleReject={this.handleAcceptBO}
                  />
                ))}
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
          <DialogTitle id="responsive-dialog-title">
            {'Se ha acceptado la solicitud correctamente'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Se ha acceptado la solicitud</DialogContentText>
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
