import authHeader from '../_helpers/auth-header';

function logout() {
  localStorage.removeItem('user');
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
}

function getSelfUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data);
}

const userService = {
  login,
  logout,
  register,
  getSelfUser,
};

export default userService;
