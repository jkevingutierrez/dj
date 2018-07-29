import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

function ContainedButton(props) {
  const { classes, ...rest } = props;
  return (
    <Button variant="contained" color="primary" className={classes.button} {...rest}>
      {props.children}
    </Button>
  );
}

ContainedButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButton);
