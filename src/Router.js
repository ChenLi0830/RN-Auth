import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';

const RouterComponent = () => {
  return <Router sceneStyle={{paddingTop: 65}}>
    <Scene key="login" component={LoginForm} title="Please Login" initial  />
    <Scene key="employeeList" component={EmployeeList} title="Employee List" />
  </Router>
};

export default RouterComponent;