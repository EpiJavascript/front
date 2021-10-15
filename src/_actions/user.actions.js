import userConstants from '../_constants/user.constants';
import userService from '../_services/user.service';
import alertActions from './alert.actions';
import history from '../_helpers/history';

function login(email, password, from) {
  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        history.push(from);
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      },
    );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  function request() {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success() {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      () => {
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful. Please login.'));
      },
      (error) => {
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      },
    );
  };
}

function getSelfUser() {
  function request() {
    return { type: userConstants.GETSELFUSER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETSELFUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETSELFUSER_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(request());

    userService.getSelfUser().then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString())),
    );
  };
}

const userActions = {
  login,
  logout,
  register,
  getSelfUser,
};

export default userActions;
