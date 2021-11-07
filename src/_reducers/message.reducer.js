import { messageConstants } from '../_constants';

function message(state = {}, action) {
  switch (action.type) {
    case messageConstants.MESSAGE_UPDATE:
      return {
        messages: action.messages,
      };
    case messageConstants.MESSAGE_CLEAR:
      return {};
    default:
      return state;
  }
}

export default message;
