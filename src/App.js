import React, {Component} from 'react';
import {View} from 'react-native';
import {Header} from './components/common';
import LoginForm from './components/LoginForm';
import * as firebase from 'firebase';

class App extends Component {
  state = { loggedIn: false };
  
  componentWillMount() {
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    const config = {
      apiKey: "AIzaSyAGtRe94tGwEWKgf2huGqezY3aS_4NS08U",
      authDomain: "rn-auth-f61f6.firebaseapp.com",
      databaseURL: "https://rn-auth-f61f6.firebaseio.com",
      storageBucket: "rn-auth-f61f6.appspot.com",
      messagingSenderId: "742565197509"
    };
    firebase.initializeApp(config);
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  
  render() {
    return <View>
      <Header title="Authentication"/>
      <LoginForm />
    </View>
  }
}

export default App;