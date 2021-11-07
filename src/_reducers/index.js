import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import registration from './registration.reducer';
import user from './users.reducer';
import server from './server.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  server,
  user,
});

export default rootReducer;
