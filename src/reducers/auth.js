import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from '../actions/auth';

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    
  case SET_AUTH_TOKEN:
    return {
      ...state,
      authToken: action.authToken
    }

  case CLEAR_AUTH:
    return {
      ...state,
      authToken: null,
      currentUser: null,
      inactiveUser: false
    };

  case AUTH_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    };

  case AUTH_SUCCESS:
    return {
      ...state,
      loading: false,
      currentUser: action.currentUser
    };

  case AUTH_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error
    };

  default:
    return state;
  }
}