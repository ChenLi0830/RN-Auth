import React, {Component} from 'react';
import * as firebase from 'firebase';
import Router from './Router';
import LoginForm from  './components/LoginForm';
import {Provider} from 'react-redux';
import store from './modules';

class App extends Component {
  // state = {loggedIn: null};
  
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
    
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({loggedIn: true});
    //   } else {
    //     this.setState({loggedIn: false});
    //   }
    // });
  }
  
  // renderContent() {
  //   switch (this.state.loggedIn) {
  //     case true:
  //       return <CardSection>
  //           <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
  //         </CardSection>
  //
  //     case false:
  //       return <LoginForm />;
  //
  //     default:
  //       return <Spinner size="large"/>;
  //   }
  // }
  
  
  render() {
    return <Provider store={store}>
      <Router/>
    </Provider>;
    // return <View>
    //   <Header title="Authentication"/>
    //   <LoginForm/>
    // </View>
  }
}

export default App;