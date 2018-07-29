import React, { Component } from 'react';
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
import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import locationsData from '../assets/data/locations.json'
import wasteTypesData from '../assets/data/waste-types.json'

const styles = theme => ({
  form: {
    margin: 20,
    padding: 20
  },
  button: {
    marginTop: 30
  },
  formControl: {
    marginTop: 20
  },
})

class RequestPickupForm extends Component {
  state = {
    selectedWasteType: '',
    selectedLocation: '',
    selectedDate: null,
    locations: [],
    wasteTypes: []
  };

  componentDidMount() {
    // fetch('https://api.mydomain.com')
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //     data
    //   }));

    this.setState({
      wasteTypes: wasteTypesData.types,
      locations: locationsData.locations
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(event);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} justify="center">>
       <Grid item xs={8}>
          <Paper>
            <form autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
              <Typography variant="title" className={classes.typography} gutterBottom>
                Solicitud para recolección de residuos
              </Typography>
              <FormControl required className={classes.formControl} fullWidth={true}>
                <InputLabel htmlFor="waste-type">Tipo de residuo</InputLabel>
                <Select
                  value={this.state.selectedWasteType}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'selectedWasteType',
                    id: 'waste-type'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    this.state.wasteTypes.map((wasteType) =>
                      <MenuItem key={wasteType.replace(/[^a-z0-9áéíóúñü_-\s\.,]/gim, '')} value={wasteType}>{wasteType}</MenuItem>
                    )
                  }
                </Select>
                <FormHelperText>Obligatorio</FormHelperText>
              </FormControl>
              <FormControl required className={classes.formControl} fullWidth={true}>
                <InputLabel htmlFor="location">Localidad</InputLabel>
                <Select
                  value={this.state.selectedLocation}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'selectedLocation',
                    id: 'location'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    this.state.locations.map((location, index) =>
                      <MenuItem key={location.replace(/[^a-z0-9áéíóúñü_-\s\.,]/gim, '')} value={index}>{location}</MenuItem>
                    )
                  }
                </Select>
                <FormHelperText>Obligatorio</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} required fullWidth={true}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    autoOk
                    label="Seleccionar fecha *"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    disablePast={true}
                  />
                </MuiPickersUtilsProvider>
                <FormHelperText>Obligatorio</FormHelperText>
              </FormControl>
              <FormControl required className={classes.formControl} fullWidth={false}>
                <Button variant="contained" color="primary" className={classes.button} type="submit">
                  Solicitar recolección
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>

    );
  }
}

RequestPickupForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequestPickupForm);
