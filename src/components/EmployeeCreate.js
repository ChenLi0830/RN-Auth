import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import { List, InputItem, Button } from 'antd-mobile';
// import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import {EmployeeFormActions} from '../modules';


const EmployeeCreate = (props) => {
  console.log("props", props);
  return <List>
    <InputItem
        placeholder="Jane"
        data-seed="logId"
        value={props.name}
        onChange={(value)=>props.employeeFormChange("name", value)}
    >Name</InputItem>
    <InputItem
        placeholder="555-555-5555"
        data-seed="logId"
        value={props.phone}
        onChange={(value)=>props.employeeFormChange("phone", value)}
    >Phone</InputItem>
    
    <Picker
        selectedValue={props.shift}
        onValueChange={(value) => props.employeeFormChange("shift", value)}>
      <Picker.Item label="Monday" value="Monday" />
      <Picker.Item label="Tuesday" value="Tuesday" />
      <Picker.Item label="Wednesday" value="Wednesday" />
      <Picker.Item label="Thursday" value="Thursday" />
      <Picker.Item label="Friday" value="Friday" />
      <Picker.Item label="Saturday" value="Saturday" />
      <Picker.Item label="Sunday" value="Sunday" />
    </Picker>
    
    <Button style={styles.btn} type="primary" onClick={e => console.log(e)}>create</Button>
  </List>
};

const styles = {
  btn:{
    marginHorizontal: 10,
  }
};

const mapStateToProps = (state) => {
  const {name, phone, shift} = state.employeeForm;
  return {
    name,
    phone,
    shift
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    employeeFormChange: (propName, value) => {
      
      dispatch(EmployeeFormActions.employeeFormChange(propName, value))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
