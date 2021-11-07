import { serverConstants } from '../_constants';

function user(state = {}, action) {
  switch (action.type) {
    case serverConstants.SERVER_UPDATE:
      return {
        server: action.server,
      };
    case serverConstants.SERVER_CLEAR:
      return {};
    default:
      return state;
  }
}

export default user;
