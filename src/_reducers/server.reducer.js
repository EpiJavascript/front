import { serverConstants } from '../_constants';

function server(state = {}, action) {
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

export default server;
