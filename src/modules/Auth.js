import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
// Action types
const USER_LOGIN_START = "USER_LOGIN_START",
    USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
    USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
    USER_EMAIL_CHANGE = "USER_EMAIL_CHANGE",
    USER_PASSWORD_CHANGE = "USER_PASSWORD_CHANGE";

// Action creator
const userLoginStart = () => ({
  type: USER_LOGIN_START,
});

const userLoginFail = (error) => ({
  type: USER_LOGIN_FAIL,
  payload: error,
});

const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

export const userEmailChange = (email)=>({
  type: USER_EMAIL_CHANGE,
  payload: email,
});

export const userPasswordChange = (password)=>({
  type: USER_PASSWORD_CHANGE,
  payload: password,
});

export const userLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userLoginStart());
      
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(userLoginSuccess(user));
      Actions.main();
    }
    catch (err) {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        dispatch(userLoginSuccess(user));
        Actions.main();
        // this.onLoginSuccess();
      }
      catch (err) {
        // console.log("error", err);
        dispatch(userLoginFail(err));
        // this.onLoginFail(err);
      }
    }
  }
};

// Reducer
const initialState = {
  email: "",
  password: "",
  error: "",
  loading: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN_START":
      return {...state, loading: true};
    case "USER_LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.message || "Authentication Failed"//JSON.stringify(action.payload) ||
      };
    case "USER_LOGIN_SUCCESS":
      return {...state, loading: false, user: action.payload, error: ""};
    case "USER_EMAIL_CHANGE":
      return {...state, email: action.payload};
    case "USER_PASSWORD_CHANGE":
      return {...state, password: action.payload};
    default:
      return state;
  }
};

export default reducer;




