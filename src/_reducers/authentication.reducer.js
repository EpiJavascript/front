import userConstants from '../_constants/user.constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { isLoggedIn: true, user } : {};

function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        isLoggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export default authentication;
