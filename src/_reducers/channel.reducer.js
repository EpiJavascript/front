import { channelConstants } from '../_constants';

function channel(state = {}, action) {
  switch (action.type) {
    case channelConstants.CHANNEL_UPDATE:
      return {
        channel: action.channel,
      };
    case channelConstants.CHANNEL_CLEAR:
      return {};
    default:
      return state;
  }
}

export default channel;
