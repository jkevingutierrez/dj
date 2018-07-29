import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  } else {
  }
});

const styles = (theme) => ({
  form: {
    margin: 20,
    padding: 20,
    minHeight: 'calc(100vh - 80px)'
  },
  button: {
    marginTop: 30
  },
  formControl: {
    marginTop: 20
  }
});

class Register extends Component {
  state = {
    accountTypes: [],
    ...this.initialState()
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        selectedLocation: this.calculateNearestLocation(position)
      });
    });

    this.setState({
      accountTypes: [
        { code: 'IE', name: 'Institución educativa' },
        { code: 'AR', name: 'Asociación de recicladores' },
        { code: 'ECAS-Ind', name: 'ECAS - Industria' }
      ],
      error: {}
    });
  }

  initialState() {
    return {
      selectedAccountType: '',
      name: '',
      email: '',
      password: '',
      isLoading: false,
      error: {},
      open: false
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlerClickRegister = (event) => {
    const auth = firebase.auth();
    const user = this.state.email;
    const pass = this.state.password;
    auth
      .createUserWithEmailAndPassword(user, pass)
      .then((datosUsuario) => {
        var ref = firebase.database().ref('USUARIOS');
        const ty = this.state.selectedAccountType;
        const name = this.state.name;
        const us = this.state.email;
        const pa = this.state.password;
        var obj = {
          PASS: pa,
          TYPE: ty,
          USER: us,
          NAME: name
        };
        ref.child(datosUsuario.user.uid).set(obj);
      })
      .catch((err) => {
        alert(err);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} justify="center">
        <Grid item xs={10}>
          <Paper>
            <form autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
              <Typography variant="title" className={classes.typography} gutterBottom>
                Solicitud para registro en Ecodemy
              </Typography>
              <FormControl
                error={this.state.error.accountType}
                required
                className={classes.formControl}
                fullWidth={true}
              >
                <InputLabel htmlFor="account-type">Tipo de cuenta</InputLabel>
                <Select
                  value={this.state.selectedAccountType}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'selectedAccountType',
                    id: 'account-type'
                  }}
                >
                  {this.state.accountTypes.map((accountType) => (
                    <MenuItem key={accountType.code} value={accountType.code}>
                      {accountType.name.charAt(0).toUpperCase() +
                        accountType.name.slice(1).toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
                {this.state.error.selectedAccountType ? (
                  <FormHelperText>Obligatorio</FormHelperText>
                ) : (
                  ''
                )}
              </FormControl>
              <FormControl
                error={this.state.error.name}
                required
                className={classes.formControl}
                fullWidth={true}
              >
                <TextField
                  id="name"
                  label="Nombre"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'name',
                    id: 'name'
                  }}
                  margin="normal"
                />
                {this.state.error.name ? <FormHelperText>Obligatorio</FormHelperText> : ''}
              </FormControl>
              <FormControl
                error={this.state.error.email}
                required
                className={classes.formControl}
                fullWidth={true}
              >
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'email',
                    id: 'email'
                  }}
                  type="email"
                  margin="normal"
                />
                {this.state.error.email ? <FormHelperText>Obligatorio</FormHelperText> : ''}
              </FormControl>
              <FormControl
                error={this.state.error.password}
                required
                className={classes.formControl}
                fullWidth={true}
              >
                <TextField
                  id="password"
                  label="Contraseña"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'password',
                    id: 'password'
                  }}
                  type="password"
                  margin="normal"
                />
                {this.state.error.password ? <FormHelperText>Obligatorio</FormHelperText> : ''}
              </FormControl>
              <FormControl className={classes.formControl} fullWidth={false}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  onClick={this.handlerClickRegister}
                >
                  Solicitar registro
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
