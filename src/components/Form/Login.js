import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
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

class Login extends Component {
  state = {
    ...this.initialState()
  };

  componentDidMount() {
    this.setState({
      error: {}
    });
  }

  initialState() {
    return {
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

  handlerClickGoogle = (event) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(datosUsuario) {
        firebase
          .database()
          .ref('USUARIOS/' + datosUsuario.user.uid)
          .once('value')
          .then(
            function(snapshot) {
              var usuario = (snapshot.val() && snapshot.val().usuario) || 'No Existe';
              if (usuario === 'No Existe') {
                firebase.auth().signOut();
                alert('el usuario seleccionado no se encuentra registrado');
              } else {
              }
            },
            function(error) {
              alert('Ha ocurrido un error');
            }
          );
      })
      .catch(function(err) {});
  };
  printRel = (rel, tipo) => {};
  handlerClick = (event) => {
    const auth = firebase.auth();
    var user = this.state.email;
    var pass = this.state.password;
    console.log(user, pass);
    auth
      .signInWithEmailAndPassword(user, pass)
      .then((datosUsuario) => {
        firebase
          .database()
          .ref('USUARIOS/' + datosUsuario.user.uid)
          .once('value')
          .then(function(snap) {
            console.log(snap.val());
            const rel = snap.val().REFERENCES;
            const tipo = snap.val().TYPE;

            switch (tipo) {
              case 'IE':
                firebase
                  .database()
                  .ref('IES/' + rel)
                  .once('value')
                  .then(function(snap) {
                    console.log(snap.val());
                  });
                break;
              case 'AR':
                firebase
                  .database()
                  .ref('ORS/' + rel)
                  .once('value')
                  .then(function(snap) {
                    console.log(snap.val());
                  });
                break;
              case 'ECAS-Ind':
                firebase
                  .database()
                  .ref('INDUSTRIA/' + rel)
                  .once('value')
                  .then(function(snap) {
                    console.log(snap.val());
                  });
                break;
              default:
                break;
            }
          });
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
                Ingresa en tu cuenta de Ecodemy
              </Typography>
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
                  onClick={this.handlerClick}
                >
                  Iniciar sesión
                </Button>
              </FormControl>
              <FormControl
                className={classes.formControl}
                style={{ marginLeft: '1em' }}
                fullWidth={false}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  onClick={this.handlerClickGoogle}
                >
                  Iniciar con Google
                </Button>
              </FormControl>
              <div>
                <Link to={`/registro`} style={{ textDecoration: 'none', marginTop: '0' }}>
                  <Button variant="contained" color="grey" className={classes.button} type="submit">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
