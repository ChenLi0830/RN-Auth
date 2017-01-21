import React, {Component} from 'react';
import {Button, Card, CardSection, Input} from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: ''};
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
               placeholder = "password"
               onChangeText={password => this.setState({password})}
               value = {this.state.password}
        />
      </CardSection>
      
      <CardSection>
        <Button>
          Log in
        </Button>
      </CardSection>
    </Card>
  }
}

export default LoginForm;