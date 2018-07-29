import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../containers/App';
import HomePage from '../pages/HomePage';
import RequestPickup from '../pages/RequestPickup';
import MapComponent from '../components/Map';
import Requests from '../components/Requests';
import NotFoundPage from '../pages/NotFoundPage';

import { pink } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: pink,
  },
})

const AppRouter = () => (
  <Router>
    <App>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/pickup/register" component={RequestPickup} />
          <Route exact path="/requests" component={Requests} />
          <Route exact path="/map" component={MapComponent} />
          <Route component={NotFoundPage} />
        </Switch>
      </MuiThemeProvider>
    </App>
  </Router>
);

export default AppRouter;
