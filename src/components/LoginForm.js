import React, {Component} from 'react';
import {Button, Card, CardSection, Input} from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }
  
  render() {
    return <Card>
      <CardSection>
        <Input label="Email"
               onChangeText={text => this.setState({text})}
               value={this.state.text}/>
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