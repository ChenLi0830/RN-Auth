import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {checkStatus} from '../api';

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

export const userEmailChange = (email) => ({
  type: USER_EMAIL_CHANGE,
  payload: email,
});

export const userPasswordChange = (password) => ({
  type: USER_PASSWORD_CHANGE,
  payload: password,
});

const saveUserToDb = async(user) => {
  try {
    let response = await fetch('https://85a1lum72a.execute-api.us-west-2.amazonaws.com/dev/users', {
      method: 'POST',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify(user)
    });
    console.log(response);
    checkStatus(response);
    let responseJson = await response.json();
    console.log("responseJson", responseJson);
    // return responseJson.movies;
  } catch (error) {
    throw error;
  }
};

export const userLogin = (email, password) => {
  return async(dispatch) => {
    try {
      dispatch(userLoginStart());
      
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(userLoginSuccess(user));
      Actions.main();
    }
    catch (err) {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const savedUser = {
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          isAnonymous: user.isAnonymous,
          id: user.uid,
          photoURL: user.photoURL,
        };
        await saveUserToDb(savedUser);
        await dispatch(userLoginSuccess(user));
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




