import {combineReducers} from 'redux';
import authReducer from './Auth';
import employeeFormReducer from './EmployeeForm';


export default combineReducers({
  auth: authReducer,
  employeeForm: employeeFormReducer,
});