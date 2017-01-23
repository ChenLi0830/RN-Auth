import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import {Actions} from 'react-native-router-flux';

const RouterComponent = () => {
  return <Router sceneStyle={{paddingTop: 65}}>
    <Scene key="auth">
      <Scene key="login" component={LoginForm} title="Please Login"/>
    </Scene>
    
    <Scene key="main" initial>
      <Scene key="employeeList" rightTitle="Add"
             onRight = {()=>{Actions.employeeCreate()}}
             component={EmployeeList} title="Employee List"
             initial
      />
      <Scene key="employeeCreate" component={EmployeeCreate} title="Employee Create"/>
    </Scene>
  </Router>
};

export default RouterComponent;