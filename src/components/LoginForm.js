import React from 'react';
import {Spinner, Button, Card, CardSection, Input} from './common';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {AuthActions} from '../modules';

const LoginForm = (props) => {
  // console.log("props", props);
  
  // async onButtonPress() {
  //   const {email, password} = this.state;
  //   this.setState({error: '', loading: true});
  //   // try {
  //   //   await firebase.auth().signInWithEmailAndPassword(email, password);
  //   // }
  //   // catch (err) {
  //   //   try {
  //   //     await firebase.auth().createUserWithEmailAndPassword(email, password);
  //   //     // this.onLoginSuccess();
  //   //   }
  //   //   catch (err) {
  //   //     console.log("error", err);
  //   //     this.onLoginFail(err);
  //   //   }
  //   // }
  // }
  
  // onLoginFail(err) {
  //   this.setState({error: err.message || "Authentication Failed", loading: false});
  // }
  //
  // onLoginSuccess() {
  //   this.setState({
  //     email: '',
  //     password: '',
  //     loading: false,
  //     error: ''
  //   });
  // }
  
  // renderButton() {
  //   if (this.state.loading) {
  //     return <Spinner size="small"/>;
  //   }
  //   return <Button onPress={()=>this.onButtonPress()}>
  //     Log in
  //   </Button>
  // }
  
  return <Card>
    <CardSection>
      <Input label="Email"
             placeholder="user@gmail.com"
             onChangeText={email => props.userEmailChange(email)}
             value={props.email}/>
    </CardSection>
    
    <CardSection>
      <Input secureTextEntry
             label="Password"
             placeholder="password"
             onChangeText={password => props.userPasswordChange(password)}
             value={props.password}/>
    </CardSection>
    
    <Text style={styles.errorTextStyle}>
      {props.error}
    </Text>
    
    <CardSection>
      {
        props.loading
            ?
            <Spinner size="small"/>
            :
            <Button onPress={()=>props.userLogin(props.email, props.password)}>
              Log in
            </Button>
      }
    </CardSection>
  </Card>
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = (state) => {
  return {...state.auth};
  // return {
  //   email: state.email,
  //   password: state.password,
  //   error: state.error,
  //   loading: state.loading,
  //   user: state.user,
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userEmailChange: (email) => dispatch(AuthActions.userEmailChange(email)),
    userPasswordChange: (password) => dispatch(AuthActions.userPasswordChange(password)),
    userLogin: (email, password) => {
      dispatch(AuthActions.userLogin(email, password))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);