// Action Types
const EMPLOYEE_FORM_CHANGE = "EMPLOYEE_FORM_CHANGE",
    EMPLOYEE_UPDATE = "EMPLOYEE_UPDATE",
    EMPLOYEE_INSERT = "EMPLOYEE_INSERT";


// Action creators
export const employeeFormChange = (propName, value) => ({ // the name of the prop changed, and its
  // value
  type: EMPLOYEE_FORM_CHANGE,
  payload: {propName, value},
});

export const employeeUpdate = (employee) => ({
  type: EMPLOYEE_UPDATE,
  payload: employee
});

export const employeeInsert = (employee) => ({
  type: EMPLOYEE_INSERT,
  payload: employee
});

// Reducers
const initialState = {
  name: "",
  phone: "",
  shift: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPLOYEE_FORM_CHANGE":
      return {...state, [action.payload.propName]: action.payload.value};
      
    case "EMPLOYEE_UPDATE":
      return state;
      
    case "EMPLOYEE_INSERT":
      return state;
      
    default:
      return state;
  }
};

export default reducer;
