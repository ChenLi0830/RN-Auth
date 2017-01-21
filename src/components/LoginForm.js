import React, {Component} from 'react';
import {Button, Card, CardSection, Input} from './common';
import firebase from 'firebase';
import {Text} from 'react-native';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: ''};
  }
  
  async onButtonPress() {
    const {email, password} = this.state;
    this.setState({error: ''});
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch (err) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      }
      catch (err) {
        console.log("error", err);
        this.setState({error: "Login Failed"});
      }
    }
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
        <Button onPress={()=>this.onButtonPress()}>
          Log in
        </Button>
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