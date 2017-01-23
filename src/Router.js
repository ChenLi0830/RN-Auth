import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

const RouterComponent = () => {
  return <Router sceneStyle={{paddingTop: 65}}>
    <Scene key="auth">
      <Scene key="login" component={LoginForm} title="Please Login"/>
    </Scene>
    
    <Scene key="main" initial>
      <Scene key="employeeList" rightTitle="Add" onRight = {()=>{console.log("Add clicked!")}}
             component={EmployeeList} title="Employee List"/>
    </Scene>
  </Router>
};

export default RouterComponent;