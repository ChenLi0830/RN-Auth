import React, {Component} from 'react';
import {Spinner, Button, Card, CardSection, Input} from './common';
import firebase from 'firebase';
import {Text} from 'react-native';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: '', loading: false};
  }
  
  async onButtonPress() {
    const {email, password} = this.state;
    this.setState({error: '', loading: true});
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch (err) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // this.onLoginSuccess();
      }
      catch (err) {
        console.log("error", err);
        this.onLoginFail(err);
      }
    }
  }
  
  onLoginFail(err) {
    this.setState({error: err.message || "Authentication Failed", loading: false});
  }
  
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }
  
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small"/>;
    }
    return <Button onPress={()=>this.onButtonPress()}>
      Log in
    </Button>
  }
  
  render() {
    return <Card>
      <CardSection>
        <Input label="Email"
               placeholder="user@gmail.com"
               onChangeText={email => this.setState({email})}
               value={this.state.email}/>
      </CardSection>
      
      <CardSection>
        <Input secureTextEntry
               label="Password"
               placeholder="password"
               onChangeText={password => this.setState({password})}
               value={this.state.password}
        />
      </CardSection>
      
      
      <Text style={styles.errorTextStyle}>
        {this.state.error}
      </Text>
      
      <CardSection>
        {this.renderButton()}
      </CardSection>
    </Card>
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;