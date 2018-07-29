import React, { Component } from 'react';
import firebase from 'firebase';
import 'normalize.css/normalize.css';
import '../assets/styles/main.scss';

var config = {
  apiKey: 'AIzaSyD-tm6iCpcspwdR7w1E7E4BMI66cntx4zc',
  authDomain: 'recycler-94604.firebaseapp.com',
  databaseURL: 'https://recycler-94604.firebaseio.com',
  projectId: 'recycler-94604',
  storageBucket: 'recycler-94604.appspot.com',
  messagingSenderId: '202993610998'
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return <main id="app">{this.props.children}</main>;
  }
}

export default App;
