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
      localStorage.setItem('user', JSON.stringify(data));
      store.dispatch({ type: userConstants.LOGIN_SUCCESS, user: data });
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
      if (error) throw error;
      throw new Error(error);
    });
}

function getSelfUser() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
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

async function editUser({
  id, username, email, image, password,
}) {
  const formData = new FormData();
  if (image) {
    const base64Response = await fetch(`${image.data_url}`);
    const blob = await base64Response.blob();
    formData.append('image', blob, image.file.name);
  }
  if (username) formData.append('username', username);
  if (email) formData.append('email', email);
  if (password) formData.append('password', password);
  const requestOptions = {
    method: 'PUT',
    headers: { Authorization: authHeader().Authorization },
    body: formData,
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

const userActions = {
  login,
  logout,
  register,
  getSelfUser,
  editUser,
};

export default userActions;
