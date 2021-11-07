import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import registration from './registration.reducer';
import user from './users.reducer';
import server from './server.reducer';
import channel from './channel.reducer';
import message from './message.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  server,
  channel,
  message,
  user,
});

export default rootReducer;
