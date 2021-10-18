import userConstants from '../_constants/user.constants';

function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GETSELFUSER_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETSELFUSER_SUCCESS:
      return {
        user: action.user,
      };
    case userConstants.GETSELFUSER_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}

export default user;
