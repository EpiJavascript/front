import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import registration from './registration.reducer';
import user from './users.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  user,
});

export default rootReducer;
