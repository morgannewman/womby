import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { cache } from './db/cache';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import authReducer from './reducers/auth';
import workbenchReducer from './reducers/workbench';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    workbench: workbenchReducer,
  }),
  applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = cache.authToken.load();
if (authToken) {
  store.dispatch(setAuthToken(authToken));
  store.dispatch(refreshAuthToken());
}

export default store;
