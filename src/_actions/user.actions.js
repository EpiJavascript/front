import authHeader from '../_helpers/auth-header';
import { userConstants } from '../_constants';
import store from '../_helpers/store';

function logout() {
  localStorage.removeItem('user');
  store.dispatch({ type: userConstants.LOGOUT });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  store.dispatch({ type: userConstants.LOGIN_REQUEST });
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      store.dispatch({ type: userConstants.LOGIN_SUCCESS, user: data });
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    })
    .catch((error = undefined) => {
      store.dispatch({ type: userConstants.LOGIN_FAILURE, error });
      if (error) throw error;
      throw new Error(error);
    });
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  store.dispatch({ type: userConstants.REGISTER_REQUEST });
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      store.dispatch({ type: userConstants.REGISTER_SUCCESS, user: data });
      return data;
    })
    .catch((error = undefined) => {
      store.dispatch({ type: userConstants.REGISTER_FAILURE, error });
      console.log(error);
      if (error) throw error;
      throw new Error(error);
    });
}

function getSelfUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  store.dispatch({ type: userConstants.GETSELFUSER_REQUEST });
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      store.dispatch({ type: userConstants.GETSELFUSER_SUCCESS, user: data });
      return data;
    })
    .catch((error = undefined) => {
      store.dispatch({ type: userConstants.GETSELFUSER_FAILURE, error });
      if (error) throw error;
      throw new Error(error);
    });
}

const userActions = {
  login,
  logout,
  register,
  getSelfUser,
};

export default userActions;
